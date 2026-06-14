import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useAnchorTargetClassName} from '@docusaurus/theme-common';
import type {Props} from '@theme/MDXComponents/A';
import ExternalLinkIcon from '@theme/Icon/ExternalLink';

export default function MDXA(props: Props): ReactNode {
  // MDX Footnotes have ids such as <a id="user-content-fn-1-953011" ...>
  const anchorTargetClassName = useAnchorTargetClassName(props.id);
  const { children, ...otherProps } = props
  const isExternal = props.href && !/^[/#]/.test(props.href)
  const childrenIsString = typeof children === 'string'
  const isHashtag = childrenIsString && /^#\w+$/i.test(children)
  return (
    <Link {...otherProps} className={clsx(anchorTargetClassName, props.className)}>
      {children}
      {(isExternal && childrenIsString && !isHashtag) && <ExternalLinkIcon />}
    </Link>
  );
}
