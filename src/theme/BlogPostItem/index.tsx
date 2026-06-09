import React, {type ReactNode} from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import {CustomBlogImageProvider} from '@site/src/components/custom-blog-image';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): ReactNode {
  return (
    <CustomBlogImageProvider>
      <BlogPostItem {...props} />
    </CustomBlogImageProvider>
  );
}
