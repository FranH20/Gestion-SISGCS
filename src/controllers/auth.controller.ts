import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsusutusuario} from '../entity/User'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'
import {validate} from 'class-validator'

class AuthController {
    static login = async (req: Request, res: Response) => {
        const {USUCodigo,USUcontrasenia} = req.body;
        if (!(USUCodigo && USUcontrasenia)) {
            return res.status(400).json({message:'Usuario y contrasenia son requeridos !!'});
        }
        const userRepository = getRepository(sgcsusutusuario);
        let usuario:sgcsusutusuario;
        try{
            usuario = await userRepository.findOneOrFail({where:{USUCodigo}});
        }
        catch (e){
            return res.status(400).json({ message:'Username or password incorrect !!'});
        }
        if(!usuario.checkPassword(USUcontrasenia)){
            return res.status(400).json({ message:'Username or password incorrect !!'});
        }
        const token = jwt.sign({userId:usuario.id,username:usuario.USUnombre, email:usuario.USUemail},config.jwtSecret,{expiresIn:'5h'})
        res.json({message:'OK',token, userTipo: usuario.USUtipo});
    }
    static profile = async (req: Request, res: Response) => {
        const {userId,username,email} = res.locals.jwtPayload;
        res.json({userId,username,email})
    }
    static changePassword = async (req: Request, res: Response) => {
        const {userId} = res.locals.jwtPayload;
        const {oldPassword, newPassword} = req.body;
        if(!(oldPassword && newPassword)){
            res.status(400).json({mssage:'Old password & new password son nesecarios'})
        }
        const userRepository = getRepository(sgcsusutusuario)
        let user: sgcsusutusuario;
        try{
            user = await userRepository.findOneOrFail(userId);
            console.log(user.rol)
        }catch(e){
            return res.status(400).json({mssage:'Algo salio mal!'});
        }

        if(!user.checkPassword(oldPassword)){
            return res.status(400).json({mssage:'Revisa tu oldPassword'});
        }

        user.USUcontrasenia = newPassword;
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(user,validationOpt); 

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        user.hashPassword();
        userRepository.save(user);
        res.json({message:'password cambiado!'});
    }
}

export default AuthController