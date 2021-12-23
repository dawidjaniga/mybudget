import express from 'express'
import cors from 'cors'

import apiRouter from './api'

const app = express()

app.use(cors({ origin: '*' }))
app.use('/api', apiRouter)

const port = process.env.PORT || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})

server.on('error', console.error)
