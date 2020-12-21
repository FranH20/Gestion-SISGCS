import {Entity, Column, PrimaryGeneratedColumn,ManyToOne,OneToMany} from 'typeorm'
import {MaxLength,IsNotEmpty,IsInt} from 'class-validator'
import {sgcsetapetapa} from './Etapa'
import {sgcsprepentregableproyecto} from './EntregableProyecto'
@Entity()
export class sgcsetgpentregable{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    ETGnombre: string;

    @Column({ type: "boolean"})
    ETGetapa: boolean;

    @ManyToOne(type => sgcsetapetapa, etapa => etapa.etg)
    @IsNotEmpty()
    @IsInt()
    eta:sgcsetapetapa

    @OneToMany(type => sgcsprepentregableproyecto, entregableProyecto => entregableProyecto.etg)
    pre:sgcsprepentregableproyecto[]
}