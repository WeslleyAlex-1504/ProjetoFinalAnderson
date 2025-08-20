import 'express-async-errors'
import "dotenv/config"
import express, { Application } from "express"
import { handleErrors } from "./error"
import cors from "cors"
import { usuarioRoutes } from './routes/usuario.routes'
import { loginRoutes } from './routes/login.routes'
import { funcionarioRoutes } from './routes/funcionario.routes'
import { DDSemanaRoutes } from './routes/ddsemana.routes'
const app:Application = express()

app.use(express.json())
app.use(cors())
app.use("/usuario", usuarioRoutes)
app.use("/login", loginRoutes)
app.use("/funcionario", funcionarioRoutes)
app.use("/ddsemana", DDSemanaRoutes)

app.use(handleErrors)
export default app