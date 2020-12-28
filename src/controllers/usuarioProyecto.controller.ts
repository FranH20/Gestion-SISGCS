import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsprupusuarioproyecto} from '../entity/UsuarioProyecto'
import {validate} from 'class-validator'

export class UsuarioProyectoController {

    static createUsuarioProyecto = async (req:Request,res:Response) => {
        const {usu,pro} = req.body;
        const usuarioProyecto = new sgcsprupusuarioproyecto();
        usuarioProyecto.usu = usu
        usuarioProyecto.pro = pro
        usuarioProyecto.PRUestado = true

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(usuarioProyecto,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const usuarioProyectoRepository = getRepository(sgcsprupusuarioproyecto);  
        try{
            await usuarioProyectoRepository.save(usuarioProyecto)
        }
        catch(e){
            return res.status(409).json({message:'El UsuarioProyecto ya existe'});
        }
        res.send('UsuarioProyecto creado');
    };
    
    static updateUsuarioProyecto = async (req:Request,res:Response) => {
        let usuarioProyecto;
        const {id} = req.params;
        const {usu,pro}  = req.body;
        const usuarioProyectoRepository = getRepository(sgcsprupusuarioproyecto);
        try{
            usuarioProyecto = await usuarioProyectoRepository.findOneOrFail(id);
            usuarioProyecto.usu = usu
            usuarioProyecto.pro = pro
            usuarioProyecto.PRUestado = true
        }
        catch(e){
            return res.status(404).json({message:'El UsuarioProyecto no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(usuarioProyecto,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await usuarioProyectoRepository.save(usuarioProyecto)
        }
        catch(e){
            return res.status(404).json({message:'El UsuarioProyecto ya existe'});
        }
        res.status(201).json({message:'UsuarioProyecto actualizado'})
    };
    
    // static deleteUsuarioProyecto = async (req:Request,res:Response) => {
    //     const {id} = req.params;
    //     const usuarioProyectoRepository = getRepository(sgcsprupusuarioproyecto);
    //     let usuarioProyecto: sgcsprupusuarioproyecto;
    //     try{
    //         usuarioProyecto = await usuarioProyectoRepository.findOneOrFail(id);
    //     }
    //     catch(e){
    //         return res.status(404).json({message:'El UsuarioProyecto no existe'});
    //     }
    //     usuarioProyectoRepository.delete(id);
    //     return res.status(201).json({message:'UsuarioProyecto eliminado'})
    // };

    static deleteUsuarioProyecto = async (req:Request,res:Response) => {
        let usuarioProyecto;
        const {id} = req.params;
        const usuarioProyectoRepository = getRepository(sgcsprupusuarioproyecto);
        try{
            usuarioProyecto = await usuarioProyectoRepository.findOneOrFail(id);
            usuarioProyecto.PRUestado = false
        }
        catch(e){
            return res.status(404).json({message:'El UsuarioProyecto no fue encontrado'});
        }
        try{
            await usuarioProyectoRepository.save(usuarioProyecto)
        }
        catch(e){
            return res.status(404).json({message:'El UsuarioProyecto ya existe'});
        }
        res.status(201).json({message:'UsuarioProyecto desactivado'})
    };
    
}

export default UsuarioProyectoController