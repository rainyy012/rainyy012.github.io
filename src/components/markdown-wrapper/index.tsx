import { evaluate } from '@mdx-js/mdx'
import MDXAnchor from '@theme/MDXComponents/A'
import MDXCode from '@theme/MDXComponents/Code'
import MDXDetails from '@theme/MDXComponents/Details'
import MDXHeading from '@theme/MDXComponents/Heading'
import MDXImg from '@theme/MDXComponents/Img'
import MDXLi from '@theme/MDXComponents/Li'
import MDXPre from '@theme/MDXComponents/Pre'
import MDXUl from '@theme/MDXComponents/Ul'
import { MDXComponents } from 'mdx/types'
import { ComponentProps, ComponentType, lazy, ReactNode, Suspense, useMemo } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { Spoiler, YTEmbed } from '../composing'

export interface MarkdownWrapperProps {
  children: string
}

export function MarkdownWrapper({
  children,
}: MarkdownWrapperProps): ReactNode {
  const CompiledContent = useMemo(() => {
    return lazy(async () => evaluate(children, jsxRuntime))
  }, [children])
  return (
    <Suspense>
      {/* eslint-disable-next-line react-hooks/static-components */}
      <CompiledContent components={CUSTOM_COMPONENTS} />
    </Suspense>
  )
}

// -----------------------------------------------------------------------------

type MDXHeadingProps = Omit<ComponentProps<typeof MDXHeading>, 'as'>

type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const HEADING_COMPONENTS = new Array<ComponentType<MDXHeadingProps>>(6).reduce((acc, _, index) => {
  const headingLevel = index + 1
  const elementName = `h${headingLevel}` as HeadingElements
  acc[elementName] = function ({
    children,
    ...props
  }: MDXHeadingProps) {
    return (
      <MDXHeading as={elementName} {...props}>
        {children}
      </MDXHeading>
    )
  }
  acc[elementName].displayName = `CustomH${headingLevel}`
  return acc
}, {} as Record<HeadingElements, ComponentType<MDXHeadingProps>>)

const CUSTOM_COMPONENTS: MDXComponents = {
  ...HEADING_COMPONENTS,
  'a': MDXAnchor,
  'code': MDXCode,
  'details': MDXDetails,
  'img': MDXImg,
  'li': MDXLi,
  'pre': MDXPre,
  'ul': MDXUl,
  Spoiler,
  YTEmbed,
}
