import { CUSTOM_VALUES } from '@site/src/constants'
import seedrandom from 'seedrandom'

const missingValues: Array<string> = []

if (!CUSTOM_VALUES.BTC_DONATION_ADDRESSES || CUSTOM_VALUES.BTC_DONATION_ADDRESSES.length <= 0) {
  missingValues.push('BTC_DONATION_ADDRESSES')
}

export const BTC_DONATION_ADDRESS = CUSTOM_VALUES.BTC_DONATION_ADDRESSES[
  Math.floor(CUSTOM_VALUES.BTC_DONATION_ADDRESSES.length * seedrandom(
    String(5 * Math.floor(new Date().getDate() / 5))
  )())
]
if (!BTC_DONATION_ADDRESS) { missingValues.push('BTC_DONATION_ADDRESS') }

export const ETH_DONATION_ADDRESS = CUSTOM_VALUES.ETH_DONATION_ADDRESS
if (!ETH_DONATION_ADDRESS) { missingValues.push('ETH_DONATION_ADDRESS') }

if (missingValues.length > 0) {
  console.warn(`Missing values: ${missingValues.join(', ')}`)
}
