import { CUSTOM_VALUES } from '@site/src/components/custom-value'
import seedrandom from 'seedrandom'

export const BTC_ADDRESS = CUSTOM_VALUES.DONATE_BTC_ADDRESSES[
  Math.floor(CUSTOM_VALUES.DONATE_BTC_ADDRESSES.length * seedrandom(
    String(5 * Math.floor(new Date().getDate() / 5))
  )())
]

export const ETH_ADDRESS = CUSTOM_VALUES.DONATE_ETH_ADDRESS
