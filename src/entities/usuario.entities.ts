import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuario")
export class Usuario {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    nome: string

    @Column()
    telefone: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ type: "boolean" })
    admin: boolean
}