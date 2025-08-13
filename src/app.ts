import 'express-async-errors'
import "dotenv/config"
import express, { Application } from "express"
import { handleErrors } from "./error"
import cors from "cors"
import { usuarioRoutes } from './routes/usuario.routes'
const app:Application = express()

app.use(express.json())
app.use(cors())
app.use("/usuario", usuarioRoutes)

app.use(handleErrors)
export default app