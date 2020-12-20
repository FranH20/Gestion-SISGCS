import {Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne, UpdateDateColumn,CreateDateColumn} from 'typeorm'
import {MaxLength,IsNotEmpty,IsInt,Min} from 'class-validator'
import {sgcsprepentregableproyecto} from './EntregableProyecto'
import {sgcsprupusuarioproyecto} from './UsuarioProyecto'
@Entity()
export class sgcstarptarea{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    TARnombre: string;

    @Column({type: "date"})
    TARfechainicio: Date;

    @Column({type: "date"})
    TARfechafin: Date;

    @Column({ type: "varchar", length: 250 })
    @MaxLength(251)
    TARdescripcion: string;

    @Column({ type: "char", length:1})
    @MaxLength(2)
    TARestado: string;

    @Column({ type: "int", width: 3})
    @IsNotEmpty()
    @IsInt()
    TARprogreso: number;

    @Column({ type: "varchar", length: 250 })
    @MaxLength(251)
    TARarchivoequipo: string;

    @ManyToOne(type => sgcsprepentregableproyecto, entregableProyecto => entregableProyecto.tar)
    pre:sgcsprepentregableproyecto

    @ManyToOne(type => sgcsprupusuarioproyecto, usuarioproyecto => usuarioproyecto.tar)
    pru:sgcsprupusuarioproyecto

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}