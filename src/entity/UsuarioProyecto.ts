import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, UpdateDateColumn,CreateDateColumn, ManyToMany} from 'typeorm'
import {MaxLength} from 'class-validator'
import {sgcsusutusuario} from './User'
import {sgcspropproyecto} from './Proyecto'
import {sgcssolpsolicitudcambio} from './SolicitudCambio'
import {sgcsprepentregableproyecto} from './EntregableProyecto'
import {sgcstarptarea} from './Tarea'
@Entity()
export class sgcsprupusuarioproyecto{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @ManyToOne(type => sgcsusutusuario, usuario => usuario.pru)
    usu:sgcsusutusuario

    @ManyToOne(type => sgcspropproyecto, proyecto => proyecto.pru)
    pro:sgcspropproyecto
    
    @OneToMany(type => sgcssolpsolicitudcambio, solicitudCambio => solicitudCambio.pru)
    sol:sgcssolpsolicitudcambio[]

    @OneToMany(type => sgcsprepentregableproyecto, entregableProyecto => entregableProyecto.pru)
    pre:sgcsprepentregableproyecto[]

    @OneToMany(type => sgcstarptarea, usuarioproyecto => usuarioproyecto.pru)
    tar:sgcstarptarea[]

    @Column({ type: "boolean"})
    PRUestado: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}