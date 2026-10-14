import fs from 'fs'

async function main(): Promise<void> {
  if (isAlpine() || isCI()) {
    return
  } else {
    console.log([
      '',
      '⚠️  Are you sure you want to deploy from a LOCAL MACHINE?',
      '   ┌─────────────────────────────────────┐',
      '   │ To deploy from a LOCAL MACHINE,     │',
      '   │ please use `pnpm run deploy-local`. │',
      '   └─────────────────────────────────────┘',
      '',
    ].join('\n'))
    process.exit(1)
  }
}

main()

function isAlpine(): boolean {
  if (fs.existsSync('/etc/alpine-release')) {
    return true
  }
  return false
}

function isCI(): boolean {
  if (process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true') {
    return true
  }
  return false
}
