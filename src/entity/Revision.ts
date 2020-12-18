import {Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne, UpdateDateColumn,CreateDateColumn} from 'typeorm'
import {MaxLength} from 'class-validator'
import {sgcsprepentregableproyecto} from './EntregableProyecto'
@Entity()
export class sgcsrevpprevision{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @Column({type: "date"})
    REVfecha: Date;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    REVnombre: string;

    @Column({ type: "varchar", length: 250 })
    @MaxLength(251)
    REVmotivo: string;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    REVpredecesor: string;

    @Column({ type: "boolean"})
    REVestado: boolean;

    @Column({ type: "varchar", length: 250 })
    @MaxLength(251)
    REVdetalle: string;

    @ManyToOne(type => sgcsprepentregableproyecto, entregableProyecto => entregableProyecto.pro)
    pre:sgcsprepentregableproyecto

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}