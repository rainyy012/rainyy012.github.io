import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export interface CustomValues {
  DISCORD_LINK: string
  GITHUB_SHA: string
  GOOGLE_ANALYTICS_ID: string
  RAIN_GITHUB_IO: string
  DONATE_ETHEREUM_ADDRESS: string
}

export function useCustomValues(): CustomValues {
  return useDocusaurusContext().siteConfig.customFields! as unknown as CustomValues
}

export interface CustomValueProps {
  id: keyof CustomValues
}

export function CustomValue({ id }: CustomValueProps): CustomValues[typeof id] {
  return useCustomValues()[id]
}
