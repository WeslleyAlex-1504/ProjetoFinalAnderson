import 'express-async-errors'
import "dotenv/config"
import express, { Application } from "express"
import { handleErrors } from "./error"
import cors from "cors"
const app:Application = express()

app.use(express.json())
app.use(cors())

app.use(handleErrors)
export default app