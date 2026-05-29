import { ReactNode } from 'react'

export const END_OF_PAGE_ID = '_end'

export function EndOfPage(): ReactNode {
  return <div id={END_OF_PAGE_ID} />
}
