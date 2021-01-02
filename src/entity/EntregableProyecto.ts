import {Entity, Column, ManyToOne,PrimaryGeneratedColumn,OneToMany, UpdateDateColumn,CreateDateColumn} from 'typeorm'
import {IsNotEmpty,IsInt,Min,MaxLength, Max} from 'class-validator'
import {sgcsprupusuarioproyecto} from './UsuarioProyecto'
import {sgcspropproyecto} from './Proyecto'
import {sgcsetgpentregable} from './Entregable'
import {sgcsrevpprevision} from './Revision'
import {sgcstarptarea} from './Tarea'
@Entity()
export class sgcsprepentregableproyecto{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;
    
    @Column({ type: "int", width: 3 })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(100)
    PREprogreso: number;

    @Column({ type: "varchar", length: 250 })
    @MaxLength(251)
    PREarchivo: string;

    @Column({ type: "boolean"})
    PREestado: boolean;

    @ManyToOne(type => sgcspropproyecto, proyecto => proyecto.pre)
    @IsNotEmpty()
    @IsInt()
    pro:sgcspropproyecto

    @ManyToOne(type => sgcsetgpentregable, entregable => entregable.pre)
    @IsNotEmpty()
    @IsInt()
    etg:sgcsetgpentregable

    @ManyToOne(type => sgcsprupusuarioproyecto, usuarioproyecto => usuarioproyecto.pre)
    @IsNotEmpty()
    @IsInt()
    pru:sgcsprupusuarioproyecto

    @OneToMany(type => sgcsrevpprevision, revision => revision.pre)
    rev:sgcsrevpprevision[]

    @OneToMany(type => sgcstarptarea, tarea => tarea.pre)
    tar:sgcstarptarea[]

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}