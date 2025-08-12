import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ddsemana")
export class DdSemana {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    nome: string

    @Column({ type: "time" })
    horaInicial: string

    @Column({ type: "time" })
    horaFinal: string
}