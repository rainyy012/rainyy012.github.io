import { isEmptyObject } from '@site/src/utils/object.draft'
import { produce } from 'immer'
import {
  Children,
  createContext,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { MdCheck as CorrectIcon, MdClose as WrongIcon } from 'react-icons/md'
import { toast } from 'react-toastify'
import styles from './index.module.css'

// Note: In the future, if…
// - a `randomizeQuestions` feature is implemented, `questionId` prop must be supplied
// - a `randomizeChoices` feature is implemented, `answerId` prop must be supplied

const STORAGE_KEY_PREFIX = 'quiz/mcq/'

function serializeAnswers(data: Record<string, string>, revision: number): string {
  return JSON.stringify({ revision, data })
}

interface ISerializableAnswers {
  data: Record<string, string>
  revision: number
}

function parseAnswers(serializedData: string): ISerializableAnswers {
  return JSON.parse(serializedData)
}

export interface MultipleChoiceQuestionSetProps {
  children?: ReactNode
  overwriteCorrectText?: ReactNode
  overwriteWrongText?: ReactNode
  persistenceKey?: string
  /**
   * This allows the question set to ignore previously saved answers if there is
   * a revision (changes made to the questions).
   * @defaultValue `1`
   */
  revision?: number
}

export function MultipleChoiceQuestionSet({
  children,
  overwriteCorrectText: correctText = 'That is correct!',
  overwriteWrongText: wrongText = 'Try again?',
  persistenceKey,
  revision: $revision,
}: MultipleChoiceQuestionSetProps): ReactNode {

  const revision = useMemo(() => {
    if ($revision) {
      if ($revision < 1) {
        throw new Error('Revision number must be at least 1')
      }
      if ($revision !== Math.round($revision)) {
        throw new Error('Revision number cannot be a decimal')
      }
      return $revision
    } else {
      return 1
    }
  }, [$revision])

  const storageKey = persistenceKey ? (STORAGE_KEY_PREFIX + persistenceKey) : undefined

  const [scoreMap, setScoreMap] = useState(() => new ScoreMap())
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  useEffect(() => {
    if (storageKey) {
      const rawPersistedAnswers = localStorage.getItem(storageKey)
      if (rawPersistedAnswers) {
        try {
          const { revision: persistedRevision, data } = parseAnswers(rawPersistedAnswers)
          if (persistedRevision === revision) {
            // If revision numbers don't match, persisted data will remain in the localStorage
            // unless new answers have been chosen. This is just in case of bug.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedAnswers(data)
          } else {
            toast.info('Previous answers are not restored because some questions have been revised.')
          }
        } catch (error) {
          toast.error('Unable to restore previously saved answers')
          console.error(error)
        }
      }
    }
  }, [revision, storageKey])

  const onSelectAnswer = useCallback((
    questionId: string,
    answerId: string,
    isCorrect: boolean,
  ) => {
    setSelectedAnswers(produce((answers) => {
      answers[questionId] = answerId
      if (storageKey) {
        localStorage.setItem(storageKey, serializeAnswers(answers, revision))
      }
    }))
    setScoreMap((prevScoreMap) => {
      return new ScoreMap(prevScoreMap).set(questionId, isCorrect)
    })
  }, [revision, storageKey])

  const conflictingIds = new Set<string>()
  const questionIds = new Set<string>()
  const mappedChildren = Children.map(children, (child, questionIndex) => {
    const { id } = (child as ReactElement<MultipleChoiceQuestionProps>).props
    const questionId = id || `q${questionIndex}`
    if (questionIds.has(questionId)) {
      conflictingIds.add(questionId)
    } else {
      questionIds.add(questionId)
    }
    return (
      <QuestionContext
        key={questionId}
        value={{
          questionId,
          selectedAnswer: selectedAnswers[questionId],
          onSelectAnswer,
          defaultCorrectText: correctText,
          defaultWrongText: wrongText,
        }}
      >
        <li>{child}</li>
      </QuestionContext>
    )
  })

  if (conflictingIds.size > 0) {
    throw new Error(`Conflicting question ids: ${[...conflictingIds].join(', ')}`)
  }

  const resetButton = (
    <button
      className='button button--primary'
      type='reset'
      disabled={isEmptyObject(selectedAnswers)}
      onClick={useCallback((event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (window.confirm('Are you sure you want to reset the answers?')) {
          if (storageKey) {
            localStorage.removeItem(storageKey)
          }
          setScoreMap(new ScoreMap())
          setSelectedAnswers({})
        } else {
          event.preventDefault()
        }
      }, [storageKey])}
    >
      Reset answers
    </button>
  )

  return (
    <form id={persistenceKey}>
      {persistenceKey && (
        <div className={styles.header}>
          {resetButton}
        </div>
      )}
      <ol>
        {mappedChildren}
      </ol>
      <div className={styles.footer}>
        <span className={styles.totalScore}>
          Total Score: {scoreMap.getScore()} / {questionIds.size}
        </span>
        {resetButton}
      </div>
    </form>
  )

}

class ScoreMap extends Map<string, boolean | null> {

  getScore(): number {
    let score = 0
    this.forEach((isCorrect) => {
      if (isCorrect) { score += 1 }
    })
    return score
  }

}

interface IQuestionContext {
  questionId: string
  selectedAnswer: string
  onSelectAnswer(
    questionId: string,
    answerId: string,
    isCorrect: boolean,
  ): void
  defaultCorrectText: ReactNode
  defaultWrongText: ReactNode
}

const QuestionContext = createContext<IQuestionContext | null>(null)

// -----------------------------------------------------------------------------

export interface MultipleChoiceQuestionProps {
  /**
   * The question itself.
   */
  text: ReactNode
  /**
   * Optional ID for persisting answers.
   */
  id?: string
  /**
   * The choices encapsulated in the {@link Choice|`<Choice>`} component.
   */
  children?: ReactNode
  /**
   * Extra text that is shown only after an answer has been selected,
   * regardless of whether it is correct or wrong.
   */
  postAnswerText?: ReactNode
  overwriteCorrectText?: ReactNode
  overwriteWrongText?: ReactNode
}

export function MultipleChoiceQuestion({
  text,
  children,
  postAnswerText,
  overwriteCorrectText,
  overwriteWrongText,
}: MultipleChoiceQuestionProps): ReactNode {

  const context = useContext(QuestionContext)
  if (!context) {
    throw new Error('<MultipleChoiceQuestion> can only be used inside <MultipleChoiceQuestionSet>')
  }
  const {
    questionId,
    onSelectAnswer,
    defaultCorrectText,
    defaultWrongText,
    selectedAnswer,
  } = context

  const correctText = overwriteCorrectText ?? defaultCorrectText
  const wrongText = overwriteWrongText ?? defaultWrongText

  const correctAnswers = new Set<string>()
  const answerBasedExplanations = new Map<string, ReactNode>()

  const mappedChildren = Children.map((children), (child, answerIndex) => {
    const { id, isCorrect, explanation } = (child as ReactElement<ChoiceProps>).props
    const answerId = id || `${questionId}/a${answerIndex}`
    if (isCorrect) {
      correctAnswers.add(answerId)
    }
    if (explanation) {
      answerBasedExplanations.set(answerId, explanation)
    }
    return (
      <ChoiceContext
        key={answerId}
        value={{
          questionId,
          answerId,
          onSelect() { onSelectAnswer(questionId, answerId, !!isCorrect) }
        }}
      >
        {child}
      </ChoiceContext>
    )
  })

  if (!mappedChildren || mappedChildren.length <= 0) {
    throw new Error('<MultipleChoiceQuestion> must have at least one <Choice>')
  }

  if (correctAnswers.size <= 0) {
    throw new Error(`<MultipleChoiceQuestion> must have at least one <Choice> where \`isCorrect={true}\`\nText: "${text}"`)
  }
  const isCorrectAnswerSelected = selectedAnswer ? correctAnswers.has(selectedAnswer) : false

  return (
    <div className={styles.container} data-correct={isCorrectAnswerSelected}>
      <p className={styles.question}>{text}</p>
      <ul className={styles.choiceList}>
        {mappedChildren}
      </ul>
      {selectedAnswer && (() => {
        const answerBasedExplanation = answerBasedExplanations.get(selectedAnswer)
        const Icon = isCorrectAnswerSelected ? CorrectIcon : WrongIcon
        return (
          <div
            className={styles.explanation}
            data-correct={isCorrectAnswerSelected}
          >
            <Icon size={20} />
            <span>
              {answerBasedExplanation ?? (isCorrectAnswerSelected ? correctText : wrongText)}
              {postAnswerText ? <>{' '}{postAnswerText}</> : null}
            </span>
          </div>
        )
      })()}
    </div>
  )

}

// -----------------------------------------------------------------------------

interface IChoiceContext {
  questionId: string
  answerId: string
  onSelect(): void
}

const ChoiceContext = createContext<IChoiceContext | null>(null)

export interface ChoiceProps {
  /**
   * Optional ID for persisting answers.
   */
  id?: string
  children?: ReactNode
  isCorrect?: boolean
  /**
   * Explanation of the answer. This overrides the values of
   * `overwriteCorrectText` and `overwriteWrongText`.
   */
  explanation?: string
}

export function Choice({
  children,
}: ChoiceProps): ReactNode {
  const { selectedAnswer } = useContext(QuestionContext)!
  const context = useContext(ChoiceContext)
  if (!context) {
    throw new Error('<Choice> can only be used inside <MultipleChoiceQuestion>')
  }
  const { questionId, answerId, onSelect } = context
  return (
    <li className={styles.choiceItem}>
      <input
        type='radio'
        id={answerId}
        value={answerId}
        checked={selectedAnswer === answerId}
        name={questionId}
        onChange={onSelect}
      />
      <label htmlFor={answerId}>{children}</label>
    </li>
  )
}
