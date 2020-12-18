import {Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany, UpdateDateColumn,CreateDateColumn} from 'typeorm'
import {sgcsroltrol} from './Role'
import {IsNotEmpty,IsEmail,IsInt,Min,MaxLength} from 'class-validator'
import * as bcrypt from 'bcryptjs'
import {sgcsprupusuarioproyecto} from './UsuarioProyecto'

@Entity()
export class sgcsusutusuario{
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    @Column({ type: "int", width: 8 , unique:true})
    @IsNotEmpty()
    @IsInt()
    @Min(8)
    USUCodigo: number;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    USUnombre: string;

    @Column({ type: "varchar", length: 190 })
    @MaxLength(191)
    USUApellido: string;

    @Column({ type: "int", width: 8 })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    USUtipo: number;

    @Column({ type: "varchar", length: 190, unique: true })
    @IsEmail()
    @IsNotEmpty()
    USUemail: string;

    @Column({ type: "varchar", length: 190 })
    @IsNotEmpty()
    @MaxLength(191)
    USUcontrasenia: string;

    @Column({ type: "boolean"})
    USUestado: boolean;

    @ManyToOne(type => sgcsroltrol, rol => rol.usu)
    @IsNotEmpty()
    @IsInt()
    rol:sgcsroltrol

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(type => sgcsprupusuarioproyecto, usuarioproyecto => usuarioproyecto.usu)
    pru:sgcsprupusuarioproyecto[]

    hashPassword(): void{
        const salt = bcrypt.genSaltSync(10);
        this.USUcontrasenia = bcrypt.hashSync(this.USUcontrasenia,salt)
    }
    
    checkPassword(password: string):boolean{
        return bcrypt.compareSync(password, this.USUcontrasenia)
    }

}