import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsetgpentregable} from '../entity/Entregable'
import {validate} from 'class-validator'

export class EntregableController {
    static getEntregables = async (req: Request, res:Response) => {
        const entregableRepository = getRepository(sgcsetgpentregable);
        let entregables;
        try {
            entregables = await entregableRepository.find({where:{"ETGetapa":1}});
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (entregables.length > 0){
            res.send(entregables);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getEntregable = async (req:Request,res:Response) => {
        const { id } = req.params;
        const entregableRepository = getRepository(sgcsetgpentregable);
        try{
            const entregable = await entregableRepository.findOne(id);
            res.send(entregable);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    };
    
    static createEntregable = async (req:Request,res:Response) => {
        const {ETGnombre,eta} = req.body;
        const entregable = new sgcsetgpentregable();
        entregable.ETGnombre = ETGnombre
        entregable.ETGestado = true
        entregable.eta = eta

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(entregable,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const entregableRepository = getRepository(sgcsetgpentregable);  
        try{
            await entregableRepository.save(entregable)
        }
        catch(e){
            return res.status(409).json({message:'La entregable ya existe'});
        }
        res.send('Entregable creada');
    };
    
    static updateEntregable = async (req:Request,res:Response) => {
        let entregable;
        const {id} = req.params;
        const {ETGnombre,eta} = req.body;
        const entregableRepository = getRepository(sgcsetgpentregable);
        try{
            entregable = await entregableRepository.findOneOrFail(id);
            entregable.ETGnombre = ETGnombre
            entregable.ETGestado = true
            entregable.eta = eta
        }
        catch(e){
            return res.status(404).json({message:'El entregable no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(entregable,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await entregableRepository.save(entregable)
        }
        catch(e){
            return res.status(404).json({message:'El entregable ya existe'});
        }
        res.status(201).json({message:'Entregable actualizado'})
    };
    
    // static deleteEntregable = async (req:Request,res:Response) => {
    //     const {id} = req.params;
    //     const entregableRepository = getRepository(sgcsetgpentregable);
    //     let entregable: sgcsetgpentregable;
    //     try{
    //         entregable = await entregableRepository.findOneOrFail(id);
    //     }
    //     catch(e){
    //         return res.status(404).json({message:'El entregable no existe'});
    //     }
    //     entregableRepository.delete(id);
    //     return res.status(201).json({message:'Entregable eliminada'})
    // };

    static deleteEntregable = async (req:Request,res:Response) => {
        let entregable;
        const {id} = req.params;
        const entregableRepository = getRepository(sgcsetgpentregable);
        try{
            entregable = await entregableRepository.findOneOrFail(id);
            entregable.ETGestado = false
        }
        catch(e){
            return res.status(404).json({message:'El entregable no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(entregable,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await entregableRepository.save(entregable)
        }
        catch(e){
            return res.status(404).json({message:'El entregable ya existe'});
        }
        res.status(201).json({message:'Entregable desactivado'})
    };

    // static getListaEntregable = async (req:Request, res:Response) => {
    //     const metodologiaRepository = getRepository(sgcsetgpentregable);
    //     try{
    //         metodologiaRepository.createQueryBuilder("sgcsetgpentregable","etg")
    //         .innerJoinAndSelect("user.photos", "photo", "photo.isRemoved = :isRemoved", { isRemoved: false })
    //     }catch(e){
    //         return res.status(404).json({message:'Algo esta mal!'});
    //     }
    // }
}

export default EntregableController