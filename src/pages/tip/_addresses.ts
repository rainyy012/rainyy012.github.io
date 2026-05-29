import { CUSTOM_VALUES } from '@site/src/components/custom-value'
import seedrandom from 'seedrandom'

const missingValues: Array<string> = []
export const BTC_ADDRESS = CUSTOM_VALUES.DONATE_BTC_ADDRESSES[
  Math.floor(CUSTOM_VALUES.DONATE_BTC_ADDRESSES.length * seedrandom(
    String(5 * Math.floor(new Date().getDate() / 5))
  )())
]
if (!BTC_ADDRESS) { missingValues.push('BTC_ADDRESS') }

export const ETH_ADDRESS = CUSTOM_VALUES.DONATE_ETH_ADDRESS
if (!BTC_ADDRESS) { missingValues.push('ETH_ADDRESS') }

if (missingValues.length > 0) {
  throw new Error(`Missing values: ${missingValues.join(', ')}`)
}
