import {Entity, Column, PrimaryGeneratedColumn,OneToMany,ManyToOne} from 'typeorm'
import {MaxLength,IsNotEmpty,IsInt} from 'class-validator'
import {sgcsetapetapa} from './Etapa'
import {sgcspropproyecto} from './Proyecto'
@Entity()
export class sgcsmetpmetodologia{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    METnombre: string;

    @Column({ type: "boolean"})
    METestado: boolean;

    @OneToMany(type => sgcspropproyecto, proyecto => proyecto.met)
    pro:sgcspropproyecto[]

    @OneToMany(type => sgcsetapetapa, etapa => etapa.met)
    eta:sgcsetapetapa[]
}