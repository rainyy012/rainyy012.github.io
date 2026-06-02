import React, {useEffect, type ReactNode} from 'react';
import type {Props} from '@theme/Footer/Copyright';
import { CUSTOM_VALUES } from '@site/src/constants';

export default function FooterCopyright({copyright}: Props): ReactNode {
  useEffect(() => {
    const comment = document.createComment(` Build hash: ${String(CUSTOM_VALUES.GITHUB_SHA)} `)
    document.body.append(comment)
    return () => { comment.remove() }
  }, [])
  return (
    <div
      className="footer__copyright"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      // dangerouslySetInnerHTML={{__html: copyright}}
    >
      Copyright © {new Date().getFullYear()} Rain
      {' '}
      <span style={{ opacity: 0.65, marginInlineStart: '0.5em' }}>:3</span>
    </div>
  );
}
