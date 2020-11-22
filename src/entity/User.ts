import {Entity, Column, PrimaryGeneratedColumn,Index} from 'typeorm'

@Entity()
export class sgcsusutusuario{
    @PrimaryGeneratedColumn({ type: "int"})
    USUid_usuario: number;

    @Column({ type: "varchar", length: 190 })
    USUnombre_usuario: string;

    @Column({ type: "varchar", length: 190 })
    USUApellido_Usuario: string;

    @Column({ type: "varchar", length: 190 })
    USUdni_usuario: number;

    @Column({ type: "varchar", length: 190 })
    USUcelular_usuario: string;

    @Column({ type: "varchar", length: 190 })
    USUtipo_usuario: string;

    @Column({ type: "varchar", length: 190 })
    USUfoto_usuario: string;

    @Index({ unique: true })
    @Column({ type: "varchar", length: 190 })
    USUemail_usuario: string;

    @Column({ type: "varchar", length: 190 })
    USUcontrasenia_usuario: string;

}