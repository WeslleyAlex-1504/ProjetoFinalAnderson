import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Usuario } from "./usuario.entities";
import { Funcionario } from "./funcionario.entities";
import { DdSemana } from "./ddsemana.entities";

@Entity("agenda")
export class Agenda {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "time" })
    hora: string

    @Column()
    diaMes: string

    @Column()
    mes: string

    @Column()
    ano: string

    @ManyToOne(() => Usuario, { eager: true })
    usuario: Usuario

    @ManyToOne(() => Funcionario, { eager: true })
    funcionario: Funcionario

    @ManyToOne(() => DdSemana, { eager: true })
    ddsemana: DdSemana

    @Column({ type: "boolean" })
    ativo: boolean
}