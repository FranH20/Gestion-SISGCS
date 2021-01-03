import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcspropproyecto} from '../entity/Proyecto'
import {validate} from 'class-validator'
import {sgcsprupusuarioproyecto} from '../entity/UsuarioProyecto'

export class ProyectoController {
    static getProyectos = async (req: Request, res:Response) => {
        const proyectoRepository = getRepository(sgcspropproyecto);
        let proyectos;
        try {
            proyectos = await proyectoRepository.find({where:{"PROvalor":1}, relations:["met"]});
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (proyectos.length > 0){
            res.send(proyectos);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getProyectosConJefe = async (req: Request, res:Response) => {
        const proyectoRepository = getRepository(sgcspropproyecto);
        let proyectos;
        try {
            // proyectos = await proyectoRepository.find({where:{"PROvalor":1}, relations:["met"]});
            // proyectos = await proyectoRepository.
            // createQueryBuilder('proyecto').
            // innerJoin("sgcsprupusuarioproyecto","usuarioProyecto", "proyecto.id = usuarioProyecto.pro").
            // innerJoin("sgcsusutusuario","usuario", "usuario.id = usuarioProyecto.usu").
            // select("proyecto.PROnombre","proyecto.PROdescripcion").
            // where("usuario.USUtipo =:USUtipo ",{USUtipo:2}).
            // groupBy("proyecto.id").
            // getMany();
            // proyectos = await proyectoRepository
            // .createQueryBuilder('usuarioProyecto')
            // .leftJoinAndSelect("usuarioProyecto.pro", "pro")
            // .leftJoinAndSelect("usuarioProyecto.usu", "usu")
            // .where("usu.USUtipo = 2")
            // .getMany();
            // proyectos = await proyectoRepository
            // .createQueryBuilder('usuarioProyecto')
            // .leftJoinAndMapMany("usuarioProyecto.proyecto","usuarioProyecto.pro", "pro")
            // .leftJoinAndMapMany("usuarioProyecto.usuarios","usuarioProyecto.usu", "usu")
            // .where("usu.USUtipo = 2")
            // .getMany();
            proyectos = await proyectoRepository
            .createQueryBuilder('proyecto')
            .leftJoinAndSelect('proyecto.met',"met")
            .leftJoinAndMapOne("proyecto.jefe","proyecto.pru", "pru")
            .leftJoinAndMapOne("pru.usuario","pru.usu", "usu")
            .where("usu.USUtipo = 2")
            .getMany();
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        res.send(proyectos);
        // if (proyectos.length > 0){
            
        // }else{
        //     return res.status(404).json({message:'No se encontro nada!'});
        // }
        
    };

    static getProyecto = async (req:Request,res:Response) => {
        const { id } = req.params;
        const proyectoRepository = getRepository(sgcspropproyecto);
        let proyecto
        try{
            proyecto = await proyectoRepository
            .createQueryBuilder('proyecto')
            .leftJoinAndSelect('proyecto.met','met')
            .leftJoinAndMapOne("proyecto.jefe","proyecto.pru", "pru")
            .leftJoinAndMapOne("pru.usuario","pru.usu", "usu")
            .where("proyecto.id =:id",{id:id})
            .getMany();
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
        res.send(proyecto);
    };

    
    
    static createProyecto = async (req:Request,res:Response) => {
        const {PROnombre,PROdescripcion,PROestado,PROfechainicio,PROfechafin,met} = req.body;
        const proyecto = new sgcspropproyecto();
        proyecto.PROnombre = PROnombre
        proyecto.PROdescripcion = PROdescripcion
        proyecto.PROestado = PROestado
        proyecto.PROvalor = true
        proyecto.PROfechainicio = PROfechainicio
        proyecto.PROfechafin = PROfechafin
        proyecto.met = met

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(proyecto,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const proyectoRepository = getRepository(sgcspropproyecto); 
        let idProyecto = 0 
        try{
            await proyectoRepository.save(proyecto).then(proyecto => {
                idProyecto = proyecto.id;
                console.log("Proyecto añadido de id ",proyecto.id)
            })
        }
        catch(e){
            return res.status(409).json({message:'La proyecto ya existe'});
        }
        res.send({'message':'Proyecto creado',"idProyecto":idProyecto});
    };
    
    static updateProyecto = async (req:Request,res:Response) => {
        let proyecto;
        const {id} = req.params;
        const {PROnombre,PROdescripcion,PROestado,PROfechainicio,PROfechafin,met} = req.body;
        const proyectoRepository = getRepository(sgcspropproyecto);
        try{
            proyecto = await proyectoRepository.findOneOrFail(id);
            proyecto.PROnombre = PROnombre
            proyecto.PROdescripcion = PROdescripcion
            proyecto.PROestado = PROestado
            proyecto.PROvalor = true
            proyecto.PROfechainicio = PROfechainicio
            proyecto.PROfechafin = PROfechafin
            proyecto.met = met
        }
        catch(e){
            return res.status(404).json({message:'La proyecto no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(proyecto,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await proyectoRepository.save(proyecto)
        }
        catch(e){
            return res.status(404).json({message:'La proyecto ya existe'});
        }
        res.status(201).json({message:'Proyecto actualizado'})
    };
    
    // static deleteProyecto = async (req:Request,res:Response) => {
    //     const {id} = req.params;
    //     const proyectoRepository = getRepository(sgcspropproyecto);
    //     let proyecto: sgcspropproyecto;
    //     try{
    //         proyecto = await proyectoRepository.findOneOrFail(id);
    //     }
    //     catch(e){
    //         return res.status(404).json({message:'La proyecto no existe'});
    //     }
    //     proyectoRepository.delete(id);
    //     return res.status(201).json({message:'Proyecto eliminada'})
    // };
    static deleteProyecto = async (req:Request,res:Response) => {
        let proyecto;
        const {id} = req.params;
        const proyectoRepository = getRepository(sgcspropproyecto);
        try{
            proyecto = await proyectoRepository.findOneOrFail(id);
            proyecto.PROvalor = false
        }
        catch(e){
            return res.status(404).json({message:'La proyecto no fue encontrado'});
        }
        try{
            await proyectoRepository.save(proyecto)
        }
        catch(e){
            return res.status(404).json({message:'La proyecto ya existe'});
        }
        res.status(201).json({message:'Proyecto fue desactivado'})
    };
}

export default ProyectoController