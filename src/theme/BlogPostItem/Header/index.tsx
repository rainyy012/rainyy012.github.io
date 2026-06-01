import React, {type ReactNode} from 'react';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import { ShareButtons } from '@site/src/components/share-buttons'
import { useBlogPost } from '@docusaurus/plugin-content-blog/lib/client/contexts.js'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function BlogPostItemHeader(): ReactNode {
  const { metadata } = useBlogPost()
  const { siteConfig } = useDocusaurusContext()
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors />
      <ShareButtons
        shareUrl={new URL(metadata.permalink, siteConfig.url).href}
        style={{ marginBlockEnd: 20 }}
      />
    </header>
  );
}
