import { spawn } from 'node:child_process'

const tasks = [
  'spellcheck',
  'typecheck',
  'lint',
  'test',
  'build',
]

interface IResult {
  task: string
  code: number | null
  output: any
}

const promises = tasks.map((task) => {
  return new Promise<IResult>((resolve) => {
    const child = spawn(
      'pnpm',
      ['run', task],
      {
        env: {
          ...process.env,
          FORCE_COLOR: '1',
        },
        shell: true,
      }
    )
    let output = ''
    child.stdout.on('data', (chunk) => {
      output += chunk
    })
    child.stderr.on('data', (chunk) => {
      output += chunk
    })
    child.on('close', (code) => {
      resolve({
        task,
        code,
        output,
      })
    })
  })
})

let successCount = 0

// Show output as soon as a command completes, but still, in a certain order.
for (const promise of promises) {
  const result = await promise
  process.stdout.write(result.output)
  if (result.code === 0) {
    successCount += 1
  }
}

process.exit(successCount !== tasks.length ? 1 : 0)
