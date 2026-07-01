export interface IRedirection {
  from: string
  to: string
}

export const REDIRECTION_LIST: Array<IRedirection> = [
  {
    // From 2026-06-07
    from: '/blog/pride-month-quiz',
    to: '/blog/pride-knowledge-quiz',
  },
  {
    from: '/resources/glossary/main',
    to: '/resources/glossary',
  },
]
