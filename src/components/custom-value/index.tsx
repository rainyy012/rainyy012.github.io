import GENERATED_CONFIGS from '@generated/docusaurus.config'

export interface CustomValuesEnv {
  DISCORD_LINK: string
  GITHUB_SHA?: string
  GOOGLE_ANALYTICS_ID: string
  RAIN_GITHUB_IO: string
  DONATE_ETH_ADDRESS: string
  DONATE_BTC_ADDRESSES: string
}

export interface CustomValues extends Omit<CustomValuesEnv, 'DONATE_BTC_ADDRESSES'> {
  DONATE_BTC_ADDRESSES: Array<string>
}

export const CUSTOM_VALUES = GENERATED_CONFIGS.customFields as unknown as CustomValues
