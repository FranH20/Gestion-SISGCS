import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsetapetapa} from '../entity/Etapa'
import {validate} from 'class-validator'

export class EtapaController {
    static getEtapas = async (req: Request, res:Response) => {
        const etapaRepository = getRepository(sgcsetapetapa);
        let etapas;
        try {
            etapas = await etapaRepository.find({where:{"ETAestado":1}});
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (etapas.length > 0){
            res.send(etapas);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getEtapa = async (req:Request,res:Response) => {
        const { id } = req.params;
        const etapaRepository = getRepository(sgcsetapetapa);
        try{
            const etapa = await etapaRepository.findOne(id);
            res.send(etapa);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    };
    
    static createEtapa = async (req:Request,res:Response) => {
        const {ETAnombre,met} = req.body;
        const etapa = new sgcsetapetapa();
        etapa.ETAnombre = ETAnombre
        etapa.ETAestado = true
        etapa.met = met

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(etapa,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const etapaRepository = getRepository(sgcsetapetapa);  
        try{
            await etapaRepository.save(etapa)
        }
        catch(e){
            return res.status(409).json({message:'La etapa ya existe'});
        }
        res.send('Etapa creada');
    };
    
    static updateEtapa = async (req:Request,res:Response) => {
        let etapa;
        const {id} = req.params;
        const {ETAnombre,met} = req.body;
        const etapaRepository = getRepository(sgcsetapetapa);
        try{
            etapa = await etapaRepository.findOneOrFail(id);
            etapa.ETAnombre = ETAnombre
            etapa.met = met
        }
        catch(e){
            return res.status(404).json({message:'La etapa no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(etapa,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await etapaRepository.save(etapa)
        }
        catch(e){
            return res.status(404).json({message:'La etapa ya existe'});
        }
        res.status(201).json({message:'Etapa actualizado'})
    };
    
    
    // static deleteEtapa = async (req:Request,res:Response) => {
    //     const {id} = req.params;
    //     const etapaRepository = getRepository(sgcsetapetapa);
    //     let etapa: sgcsetapetapa;
    //     try{
    //         etapa = await etapaRepository.findOneOrFail(id);
    //     }
    //     catch(e){
    //         return res.status(404).json({message:'La etapa no existe'});
    //     }
    //     etapaRepository.delete(id);
    //     return res.status(201).json({message:'Etapa eliminada'})
    // };

    static deleteEtapa = async (req:Request,res:Response) => {
        let etapa;
        const {id} = req.params;
        const etapaRepository = getRepository(sgcsetapetapa);
        try{
            etapa = await etapaRepository.findOneOrFail(id);
            etapa.ETAestado = false
        }
        catch(e){
            return res.status(404).json({message:'La etapa no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(etapa,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await etapaRepository.save(etapa)
        }
        catch(e){
            return res.status(404).json({message:'La etapa ya existe'});
        }
        res.status(201).json({message:'Etapa desactivada'})
    };
}

export default EtapaController