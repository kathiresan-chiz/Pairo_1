import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Simple JSON-file storage until a database is chosen.
const DATA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data')

let queue: Promise<void> = Promise.resolve()

export function append<T>(collection: string, record: T): Promise<void> {
  // Serialise writes so concurrent requests can't overwrite each other.
  queue = queue.then(async () => {
    await mkdir(DATA_DIR, { recursive: true })
    const file = path.join(DATA_DIR, `${collection}.json`)
    const existing = JSON.parse(await readFile(file, 'utf8').catch(() => '[]')) as T[]
    existing.push(record)
    await writeFile(file, JSON.stringify(existing, null, 2))
  })
  return queue
}
