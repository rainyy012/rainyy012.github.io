import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogPostItem/Header/Title';
import {CustomBlogImageLoader} from '@site/src/components/custom-blog-image';

import styles from './styles.module.css';

export default function BlogPostItemHeaderTitle({className}: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {permalink, title} = metadata;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
  return (
    <>
      <CustomBlogImageLoader />
      <TitleHeading className={clsx(styles.title, className)}>
        {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
      </TitleHeading>
    </>
  );
}
