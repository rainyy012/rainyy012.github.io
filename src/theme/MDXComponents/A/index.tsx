import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useAnchorTargetClassName} from '@docusaurus/theme-common';
import type {Props} from '@theme/MDXComponents/A';
import ExternalLinkIcon from '@theme/Icon/ExternalLink'
import {isString} from '@site/src/utils/type-check';
import isInternalUrl from '@docusaurus/isInternalUrl';
import useRouteContext from '@docusaurus/useRouteContext';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Link from '@docusaurus/Link';

const hashtagPattern = /^#\w+$/i
const textFragmentPattern = /#:~:text=/i

export default function MDXA(props: Props): ReactNode {
  // MDX Footnotes have ids such as <a id="user-content-fn-1-953011" ...>
  const anchorTargetClassName = useAnchorTargetClassName(props.id);
  const { children, ...otherProps } = props
  const brokenLinks = useBrokenLinks()
  if (props.href?.match(textFragmentPattern)) {
    brokenLinks.collectAnchor(props.href)
    brokenLinks.collectLink(props.href)
  }
  const isBlogContext = useRouteContext().plugin.name === 'docusaurus-plugin-content-blog'
  const isInternal = isInternalUrl(props.href)
  const childrenIsString = isString(children)
  const isHashtag = childrenIsString && children?.match(hashtagPattern)
  const showExternalLinkIcon = !isInternal && childrenIsString && !isHashtag
  const CustomMDXA = isBlogContext ? CustomBlogMDXA : CustomCommonMDXA
  return (
    <CustomMDXA
      {...otherProps}
      className={clsx(anchorTargetClassName, props.className)}
      showExternalLinkIcon={showExternalLinkIcon}
    >
      {children}
    </CustomMDXA>
  )
}

// Note: anchor links break in list view
// https://github.com/facebook/docusaurus/issues/9731

export interface CustomCommonMDXAProps extends Props {
  showExternalLinkIcon: boolean
}

export function CustomCommonMDXA({
  showExternalLinkIcon,
  children,
  ...otherProps
}: CustomCommonMDXAProps): ReactNode {
  return (
    <Link {...otherProps}>
      {children}
      {showExternalLinkIcon && <ExternalLinkIcon />}
    </Link>
  )
}

export interface CustomBlogMDXAProps extends Props {
  showExternalLinkIcon: boolean
}

const anchorLinkPattern = /^#/
export function CustomBlogMDXA({
  showExternalLinkIcon,
  children,
  href: rawHref,
  ...otherProps
}: CustomBlogMDXAProps): ReactNode {
  const { isBlogPostPage, metadata } = useBlogPost()
  const href = showExternalLinkIcon
    ? rawHref // Intentional short circuit: anchor links can never be external.
    : (rawHref?.match(anchorLinkPattern) && !isBlogPostPage) ? `${metadata.permalink}${rawHref}` : rawHref
  return (
    <Link {...otherProps} href={href}>
      {children}
      {showExternalLinkIcon && <ExternalLinkIcon />}
    </Link>
  )
}
