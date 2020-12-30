import {Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne, UpdateDateColumn,CreateDateColumn} from 'typeorm'
import {MaxLength,IsNotEmpty,IsInt} from 'class-validator'
import {sgcsprupusuarioproyecto} from './UsuarioProyecto'
import {sgcssolpsolicitudcambio} from './SolicitudCambio'
import {sgcsprepentregableproyecto} from './EntregableProyecto'
import {sgcsmetpmetodologia} from './Metodologia'

@Entity()
export class sgcspropproyecto{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    PROnombre: string;

    @Column({ type: "varchar", length: 250 })
    @MaxLength(251)
    PROdescripcion: string;

    @Column({ type: "char", length:1})
    @MaxLength(2)
    PROestado: string;

    @Column({type: "date"})
    PROfechainicio: Date;

    @Column({type: "date"})
    PROfechafin: Date;

    @Column({ type: "boolean"})
    PROvalor: boolean;

    @ManyToOne(type => sgcsmetpmetodologia, metodologia => metodologia.pro)
    @IsNotEmpty()
    @IsInt()
    met:sgcsmetpmetodologia

    @OneToMany(type => sgcsprupusuarioproyecto, usuarioproyecto => usuarioproyecto.pro)
    pru:sgcsprupusuarioproyecto[]

    @OneToMany(type => sgcssolpsolicitudcambio, solicitudCambio => solicitudCambio.pro)
    sol:sgcssolpsolicitudcambio[]

    @OneToMany(type => sgcsprepentregableproyecto, entregableProyecto => entregableProyecto.pro)
    pre:sgcsprepentregableproyecto[]

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}