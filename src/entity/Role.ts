import {Entity, PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm'
import {sgcsusutusuario} from './User'
import {IsNotEmpty,MaxLength} from 'class-validator'

@Entity()
export class sgcsroltrol {
    @PrimaryGeneratedColumn({type: 'int'})
    id:number;

    @Column({type:'varchar',length:'190'})
    @IsNotEmpty()
    @MaxLength(190)
    ROLdescripcion:string;

    @Column({ type: "boolean"})
    ROLestado: boolean;

    @OneToMany(type => sgcsusutusuario, usuario => usuario.rol)
    usu:sgcsusutusuario[]
}