import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entities";

@Entity("funcionario")
export class Funcionario {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => Usuario, { eager: true })
    usuario: Usuario;
}