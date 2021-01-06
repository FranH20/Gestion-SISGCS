import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsprupusuarioproyecto} from '../entity/UsuarioProyecto'
import {validate} from 'class-validator'
import {sgcspropproyecto} from '../entity/Proyecto'

export class UsuarioProyectoController {

    static getMiembroxProyecto = async (req:Request,res:Response) => {
        const {userId} = res.locals.jwtPayload;
        const usuarioProyectoRepository = getRepository(sgcspropproyecto);
        let proyectos;
        try {
            // proyectos = await usuarioProyectoRepository.find({where:{"usu":userId},relations:['usu','pro']});
            proyectos = await usuarioProyectoRepository.
            createQueryBuilder('proyecto')
            .leftJoinAndMapMany('proyecto.usuarioProyecto','proyecto.pru','pru')
            .where('pru.usu =:id ', {id:userId})
            .getMany();
        } catch(e) {
            console.log(e.message)
            return res.status(404).json({message:'Algo esta mal!'});
        }
        res.send(proyectos);

    }

    static getProyectoxMiembro = async (req:Request,res:Response) => {
        const {id} = req.params;
        const usuarioProyectoRepository = getRepository(sgcsprupusuarioproyecto);
        let proyectos;
        try {
            // proyectos = await usuarioProyectoRepository.find({relations:['usu','pro'],where:{pro:id,PRUestado:1}});
            proyectos = await usuarioProyectoRepository.createQueryBuilder('usuarioProyecto')
            .leftJoinAndMapOne('usuarioProyecto.usuario','usuarioProyecto.usu','usu')
            .leftJoinAndMapOne('usuarioProyecto.proyecto','usuarioProyecto.pro','pro')
            .where('usuarioProyecto.pro =:id ', {id:id})
            .where('usuarioProyecto.PRUestado = 1')
            .where('usu.USUtipo != 5')
            .getMany();
        } catch(e) {
            console.log(e)
            return res.status(404).json({message:'Algo esta mal!'});
        }
        try {
            res.send(proyectos);
        } catch (e) {
            return res.status(404).json({message:'Algo ocurrio en el camino'});
        }
    }

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