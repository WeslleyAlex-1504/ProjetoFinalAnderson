import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(()=>{
    console.log("database conectado")
     app.listen(3001,()=>{
        console.log("server is running")
     })
}).catch((error)=>{
    console.log(error)
})