import {Entity, Column, PrimaryGeneratedColumn,OneToMany} from 'typeorm'
import {MaxLength} from 'class-validator'
import {sgcsetapetapa} from './Etapa'
@Entity()
export class sgcsmetpmetodologia{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    METnombre: string;

    @Column({ type: "boolean"})
    METestado: boolean;

    @OneToMany(type => sgcsetapetapa, etapa => etapa.met)
    eta:sgcsetapetapa[]
}