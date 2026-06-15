import GENERATED_CONFIGS from '@generated/docusaurus.config'

export interface CustomValuesEnv {
  DISCORD_LINK?: string
  GIT_HASH?: string
  GOOGLE_ANALYTICS_ID?: string
  SITE_URL: string
  ETH_DONATION_ADDRESS?: string
  BTC_DONATION_ADDRESSES?: string
}

export interface CustomValues extends Omit<CustomValuesEnv, 'BTC_DONATION_ADDRESSES' | 'SITE_URL'> {
  BTC_DONATION_ADDRESS: string
}

export const CUSTOM_VALUES = GENERATED_CONFIGS.customFields as unknown as CustomValues

const missingValues: Array<string> = []

if (!CUSTOM_VALUES.BTC_DONATION_ADDRESS) {
  missingValues.push('BTC_DONATION_ADDRESS')
}

if (!CUSTOM_VALUES.ETH_DONATION_ADDRESS) {
  missingValues.push('ETH_DONATION_ADDRESS')
}

if (missingValues.length > 0) {
  console.warn(`Missing values: ${missingValues.join(', ')}`)
}
