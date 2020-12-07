import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn,CreateDateColumn} from 'typeorm'
import {sgcsroltrol} from './Role'
import {MinLength,IsNotEmpty,IsEmail,IsInt,Min,Max,MaxLength} from 'class-validator'
import * as bcrypt from 'bcryptjs'

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

    @Column({ type: "varchar", length: 100 })
    @MinLength(1)
    @MaxLength(101)
    USUtipo: string;

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

    hashPassword(): void{
        const salt = bcrypt.genSaltSync(10);
        this.USUcontrasenia = bcrypt.hashSync(this.USUcontrasenia,salt)
    }
    
    checkPassword(password: string):boolean{
        return bcrypt.compareSync(password, this.USUcontrasenia)
    }

}