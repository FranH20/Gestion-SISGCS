import {Entity, Column, ManyToOne,PrimaryGeneratedColumn, UpdateDateColumn,CreateDateColumn} from 'typeorm'
import {IsNotEmpty,IsInt,Min,MaxLength} from 'class-validator'
import {sgcsprupusuarioproyecto} from './UsuarioProyecto'
import {sgcspropproyecto} from './Proyecto'

@Entity()
export class sgcssolpsolicitudcambio{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;
    
    @Column({ type: "int", width: 10 , unique:true})
    @IsNotEmpty()
    @IsInt()
    @Min(10)
    SOLcodigo: number;

    @Column({type: "date"})
    SOLfecha: Date;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    SOLobjetivo: string;

    @Column({ type: "varchar", length: 250 })
    @MaxLength(251)
    SOLdescripcion: string;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    SOLimpacto: string;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    SOLestado: string;

    @Column({ type: "boolean"})
    SOLvalor: boolean;

    @ManyToOne(type => sgcsprupusuarioproyecto, usuarioproyecto => usuarioproyecto.sol)
    pru:sgcsprupusuarioproyecto

    @ManyToOne(type => sgcspropproyecto, proyecto => proyecto.sol)
    pro:sgcspropproyecto
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}