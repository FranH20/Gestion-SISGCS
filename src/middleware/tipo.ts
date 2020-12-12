import {Request,Response,NextFunction} from 'express'
import { getRepository } from 'typeorm';
import {sgcsusutusuario} from '../entity/User'

export const checkTipo = (tipos:Array<number>) => {
    return async (req: Request, res:Response, next:NextFunction) => {
        console.log(res.locals.jwtPayload)
        const {userId} = res.locals.jwtPayload;
        const userRepository = getRepository(sgcsusutusuario);
        let user: sgcsusutusuario;

        try{
            user = await userRepository.findOneOrFail(userId);
        }catch (e){
            return res.status(401).send({message:'No se encontro su tipo'});
        }

        //Checking
        const {USUtipo} = user;
        if (tipos.includes(USUtipo)){
            next();
        }else{
            res.status(401).json({mesage:'No autorizado'})
        }
    }
}