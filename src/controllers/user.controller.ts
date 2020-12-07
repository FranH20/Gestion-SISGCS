import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsusutusuario} from '../entity/User'
import {validate} from 'class-validator'

export class UserController{

    static getUsers = async (req:Request,res:Response) => {
        const userRepository = getRepository(sgcsusutusuario);
        let users;
        try {
            users = await userRepository.find();
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (users.length > 0){
            res.send(users);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    }
    
    static getUser = async (req:Request,res:Response) => {
        const { id } = req.params;
        const userRepository = getRepository(sgcsusutusuario)
        try{
            const user = await userRepository.findOne(id);
            res.send(user);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    }
    
    static createUsers = async (req:Request,res:Response) => {
        const {USUCodigo,USUnombre,USUApellido,USUtipo,USUemail,USUcontrasenia,USUestado,rol} = req.body;
        const user = new sgcsusutusuario();
        user.USUCodigo = USUCodigo
        user.USUnombre = USUnombre
        user.USUApellido = USUApellido
        user.USUtipo = USUtipo
        user.USUemail = USUemail
        user.USUcontrasenia = USUcontrasenia
        user.USUestado = USUestado
        user.rol = rol

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(user,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const userRepository = getRepository(sgcsusutusuario);  
        try{
            user.hashPassword();
            await userRepository.save(user)
        }
        catch(e){
            return res.status(409).json({message:'El usuario ya existe'});
        }
        res.send('Usuario creado');
    }
    
    static updateUser = async (req:Request,res:Response) => {
        let user;
        const {id} = req.params;
        const {USUCodigo,USUnombre,USUApellido,USUtipo,USUemail,USUcontrasenia,USUestado,rol} = req.body;
        const userRepository = getRepository(sgcsusutusuario);
        try{
            user = await userRepository.findOneOrFail(id);
            user.USUCodigo = USUCodigo
            user.USUnombre = USUnombre
            user.USUApellido = USUApellido
            user.USUtipo = USUtipo
            user.USUemail = USUemail
            user.USUcontrasenia = USUcontrasenia
            user.USUestado = USUestado
            user.rol = rol
        }
        catch(e){
            return res.status(404).json({message:'El usuario no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(user,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await userRepository.save(user)
        }
        catch(e){
            return res.status(404).json({message:'El usuario ya existe'});
        }
        res.status(201).json({message:'Usuario actualizado'})
    }
    
    static deleteUser = async (req:Request,res:Response) => {
        const {id} = req.params;
        const userRepository = getRepository(sgcsusutusuario);
        let user: sgcsusutusuario;
        try{
            user = await userRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(404).json({message:'El usuario no existe'});
        }
        userRepository.delete(id);
        return res.status(201).json({message:'Usuario eliminado'})
    }
}

export default UserController;

