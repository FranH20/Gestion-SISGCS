import {Entity, Column, PrimaryGeneratedColumn,ManyToOne,OneToMany} from 'typeorm'
import {MaxLength,IsNotEmpty,IsInt} from 'class-validator'
import {sgcsmetpmetodologia} from './Metodologia'
import {sgcsetgpentregable} from './Entregable'
@Entity()
export class sgcsetapetapa{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    ETAnombre: string;

    @ManyToOne(type => sgcsmetpmetodologia, metologia => metologia.eta)
    @IsNotEmpty()
    @IsInt()
    met:sgcsmetpmetodologia

    @OneToMany(type => sgcsetgpentregable, entregable => entregable.eta)
    etg:sgcsetgpentregable[]
}