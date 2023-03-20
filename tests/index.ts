import { globIterateSync } from 'glob'

const start = async () => {
  const files = globIterateSync('tests/**/*.ts')

  for (const file of files) {
    if (file !== 'tests/index.ts') await import(file)
  }
}

start()
