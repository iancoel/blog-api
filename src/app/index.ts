import express from 'express'
import * as dotenv from 'dotenv'
import { route } from './routes'

dotenv.config()

const app = express()
app.use(express.json())

const { PORT } = process.env

route(app)

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
