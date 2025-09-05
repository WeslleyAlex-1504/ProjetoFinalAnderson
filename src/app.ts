import 'express-async-errors'
import "dotenv/config"
import express, { Application } from "express"
import { handleErrors } from "./error"
import cors from "cors"
import { usuarioRoutes } from './routes/usuario.routes'
import { loginRoutes } from './routes/login.routes'
import { funcionarioRoutes } from './routes/funcionario.routes'
import { DDSemanaRoutes } from './routes/ddsemana.routes'
import { agendaRoutes } from './routes/agenda.routes'
import { atualizarCortesParaConcluidos } from "./services/agenda/deletarAutomatico";

const INTERVALO = 3600 * 1000;

setInterval(() => {
  atualizarCortesParaConcluidos().catch(err => console.error("Erro no cron:", err));
}, INTERVALO);

const app:Application = express()

app.use(cors())
app.use(express.json())
app.use("/usuario", usuarioRoutes)
app.use("/login", loginRoutes)
app.use("/funcionario", funcionarioRoutes)
app.use("/ddsemana", DDSemanaRoutes)
app.use("/agenda", agendaRoutes)

app.use(handleErrors)
export default app