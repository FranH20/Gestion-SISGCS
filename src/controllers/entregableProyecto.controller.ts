import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsprepentregableproyecto} from '../entity/EntregableProyecto'
import {validate} from 'class-validator'

export class EntregableProyectoController {
    static getEntregableProyectos = async (req: Request, res:Response) => {
        const entregableProyectoRepository = getRepository(sgcsprepentregableproyecto);
        let entregableProyectos;
        try {
            entregableProyectos = await entregableProyectoRepository.find();
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (entregableProyectos.length > 0){
            res.send(entregableProyectos);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getEntregableProyecto = async (req:Request,res:Response) => {
        const { id } = req.params;
        const entregableProyectoRepository = getRepository(sgcsprepentregableproyecto);
        try{
            const entregableProyecto = await entregableProyectoRepository.findOne(id);
            res.send(entregableProyecto);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    };
    
    static createEntregableProyecto = async (req:Request,res:Response) => {
        const {PREprogreso,PREarchivo,pro,etg,pru} = req.body;
        const entregableProyecto = new sgcsprepentregableproyecto();
        entregableProyecto.PREprogreso = PREprogreso
        entregableProyecto.PREarchivo = PREarchivo
        entregableProyecto.pro = pro
        entregableProyecto.etg = etg
        entregableProyecto.pru = pru

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(entregableProyecto,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const entregableProyectoRepository = getRepository(sgcsprepentregableproyecto);  
        try{
            await entregableProyectoRepository.save(entregableProyecto)
        }
        catch(e){
            return res.status(409).json({message:'El EntregableProyecto ya existe'});
        }
        res.send('EntregableProyecto creado');
    };
    
    static updateEntregableProyecto = async (req:Request,res:Response) => {
        let entregableProyecto;
        const {id} = req.params;
        const {PREprogreso,PREarchivo,pro,etg,pru} = req.body;
        const entregableProyectoRepository = getRepository(sgcsprepentregableproyecto);
        try{
            entregableProyecto = await entregableProyectoRepository.findOneOrFail(id);
            entregableProyecto.PREprogreso = PREprogreso
            entregableProyecto.PREarchivo = PREarchivo
            entregableProyecto.pro = pro
            entregableProyecto.etg = etg
            entregableProyecto.pru = pru
        }
        catch(e){
            return res.status(404).json({message:'El EntregableProyecto no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(entregableProyecto,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await entregableProyectoRepository.save(entregableProyecto)
        }
        catch(e){
            return res.status(404).json({message:'El EntregableProyecto ya existe'});
        }
        res.status(201).json({message:'EntregableProyecto actualizado'})
    };
    
    static deleteEntregableProyecto = async (req:Request,res:Response) => {
        const {id} = req.params;
        const entregableProyectoRepository = getRepository(sgcsprepentregableproyecto);
        let entregableProyecto: sgcsprepentregableproyecto;
        try{
            entregableProyecto = await entregableProyectoRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(404).json({message:'El EntregableProyecto no existe'});
        }
        entregableProyectoRepository.delete(id);
        return res.status(201).json({message:'EntregableProyecto eliminado'})
    };
}

export default EntregableProyectoController