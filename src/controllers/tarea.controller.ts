import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcstarptarea} from '../entity/Tarea'
import {validate} from 'class-validator'

export class TareaController {
    static getTareas = async (req: Request, res:Response) => {
        const tareaRepository = getRepository(sgcstarptarea);
        let tareas;
        try {
            tareas = await tareaRepository.find({where:{"TARvalor":1},relations:['pre','pru']});
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (tareas.length > 0){
            res.send(tareas);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getTarea = async (req:Request,res:Response) => {
        const { id } = req.params;
        const tareaRepository = getRepository(sgcstarptarea);
        try{
            const tarea = await tareaRepository.findOne(id);
            res.send(tarea);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    };
    static getTareaxMiembro = async(req: Request, res:Response) => {
        const {userId} = res.locals.jwtPayload;
        const tareaRepository = getRepository(sgcstarptarea);
        let tarea;
        try {
            // proyectos = await usuarioProyectoRepository.find({where:{"usu":userId},relations:['usu','pro']});
            tarea = await tareaRepository.
            createQueryBuilder('tarea')
            .leftJoinAndSelect('tarea.pru','pru')
            .where('pru.usu =:id ', {id:userId})
            .getMany();
        } catch(e) {
            console.log(e.message)
            return res.status(404).json({message:'Algo esta mal!'});
        }
        res.send(tarea);
    }
    static createTarea = async (req:Request,res:Response) => {
        const {TARnombre,TARfechainicio,TARfechafin,TARdescripcion,TARestado,TARprogreso,TARarchivoequipo,pre,pru} = req.body;
        const tarea = new sgcstarptarea();
        tarea.TARnombre = TARnombre
        tarea.TARfechainicio = TARfechainicio
        tarea.TARfechafin = TARfechafin
        tarea.TARdescripcion = TARdescripcion
        tarea.TARestado = TARestado
        tarea.TARvalor = true
        tarea.TARprogreso = TARprogreso
        tarea.TARarchivoequipo = TARarchivoequipo
        tarea.pre = pre
        tarea.pru = pru

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(tarea,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const tareaRepository = getRepository(sgcstarptarea);  
        try{
            await tareaRepository.save(tarea)
        }
        catch(e){
            return res.status(409).json({message:'La tarea ya existe'});
        }
        res.send('Tarea creada');
    };
    
    static updateTarea = async (req:Request,res:Response) => {
        let tarea;
        const {id} = req.params;
        const {TARnombre,TARfechainicio,TARfechafin,TARdescripcion,TARestado,TARprogreso,TARarchivoequipo,pre,pru} = req.body;
        const tareaRepository = getRepository(sgcstarptarea);
        try{
            tarea = await tareaRepository.findOneOrFail(id);
            tarea.TARnombre = TARnombre
            tarea.TARfechainicio = TARfechainicio
            tarea.TARfechafin = TARfechafin
            tarea.TARvalor = true
            tarea.TARdescripcion = TARdescripcion
            tarea.TARestado = TARestado
            tarea.TARprogreso = TARprogreso
            tarea.TARarchivoequipo = TARarchivoequipo
            tarea.pre = pre
            tarea.pru = pru
        }
        catch(e){
            return res.status(404).json({message:'La tarea no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(tarea,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await tareaRepository.save(tarea)
        }
        catch(e){
            return res.status(404).json({message:'La tarea ya existe'});
        }
        res.status(201).json({message:'Tarea actualizada'})
    };
    
    static updateTareaEnlace = async (req:Request,res:Response) => {
        let tarea;
        const {id} = req.params;
        const {TARestado,TARarchivoequipo} = req.body;
        const tareaRepository = getRepository(sgcstarptarea);
        try{
            tarea = await tareaRepository.findOneOrFail(id);
            tarea.TARestado = TARestado
            tarea.TARarchivoequipo = TARarchivoequipo
        }
        catch(e){
            return res.status(404).json({message:'La tarea no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(tarea,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await tareaRepository.save(tarea)
        }
        catch(e){
            return res.status(404).json({message:'La tarea ya existe'});
        }
        res.status(201).json({message:'Tarea actualizada en conjunto con el enlace'})
    }
    // static deleteTarea = async (req:Request,res:Response) => {
    //     const {id} = req.params;
    //     const tareaRepository = getRepository(sgcstarptarea);
    //     let tarea: sgcstarptarea;
    //     try{
    //         tarea = await tareaRepository.findOneOrFail(id);
    //     }
    //     catch(e){
    //         return res.status(404).json({message:'La tarea no existe'});
    //     }
    //     tareaRepository.delete(id);
    //     return res.status(201).json({message:'Tarea eliminada'})
    // };
    static deleteTarea = async (req:Request,res:Response) => {
        let tarea;
        const {id} = req.params;
        const tareaRepository = getRepository(sgcstarptarea);
        try{
            tarea = await tareaRepository.findOneOrFail(id);
            tarea.TARvalor = false
        }
        catch(e){
            return res.status(404).json({message:'La tarea no fue encontrado'});
        }
        try{
            await tareaRepository.save(tarea)
        }
        catch(e){
            return res.status(404).json({message:'La tarea ya existe'});
        }
        res.status(201).json({message:'Tarea desactivada'})
    };
}

export default TareaController