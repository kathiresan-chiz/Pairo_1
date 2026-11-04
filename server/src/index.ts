import 'dotenv/config'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import express, { type ErrorRequestHandler } from 'express'
import cors from 'cors'
import formsRouter from './routes/forms.js'
import { rateLimit } from './lib/rateLimit.js'

const app = express()
const PORT = Number(process.env.PORT) || 5000
// Same depth from src/ (dev) and dist/ (production), so this resolves in both.
const CLIENT_DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist')

app.disable('x-powered-by')
app.use(cors({ origin: process.env.CORS_ORIGIN || true }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', rateLimit({ windowMs: 60_000, max: 10 }), formsRouter)

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// In production the server also serves the built React app.
if (existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'))
  })
}

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong on our side. Please try again.' })
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
