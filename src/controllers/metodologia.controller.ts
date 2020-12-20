import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsmetpmetodologia} from '../entity/Metodologia'
import {validate} from 'class-validator'

export class MetodologiaController {
    static getMetodologias = async (req: Request, res:Response) => {
        const metodologiaRepository = getRepository(sgcsmetpmetodologia);
        let metodologias;
        try {
            metodologias = await metodologiaRepository.find();
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (metodologias.length > 0){
            res.send(metodologias);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getMetodologia = async (req:Request,res:Response) => {
        const { id } = req.params;
        const metodologiaRepository = getRepository(sgcsmetpmetodologia);
        try{
            const metodologia = await metodologiaRepository.findOne(id);
            res.send(metodologia);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    };
    
    static createMetodologia = async (req:Request,res:Response) => {
        const {METnombre,METestado} = req.body;
        const metodologia = new sgcsmetpmetodologia();
        metodologia.METnombre = METnombre
        metodologia.METestado = METestado

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(metodologia,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const metodologiaRepository = getRepository(sgcsmetpmetodologia);  
        try{
            await metodologiaRepository.save(metodologia)
        }
        catch(e){
            return res.status(409).json({message:'La metodologia ya existe'});
        }
        res.send('Metodologia creada');
    };
    
    static updateMetodologia = async (req:Request,res:Response) => {
        let metodologia;
        const {id} = req.params;
        const {METnombre,METestado} = req.body;
        const metodologiaRepository = getRepository(sgcsmetpmetodologia);
        try{
            metodologia = await metodologiaRepository.findOneOrFail(id);
            metodologia.METnombre = METnombre
            metodologia.METestado = METestado
        }
        catch(e){
            return res.status(404).json({message:'La metodologia no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(metodologia,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await metodologiaRepository.save(metodologia)
        }
        catch(e){
            return res.status(404).json({message:'La metodologia ya existe'});
        }
        res.status(201).json({message:'Metodologia actualizado'})
    };
    
    static deleteMetodologia = async (req:Request,res:Response) => {
        const {id} = req.params;
        const metodologiaRepository = getRepository(sgcsmetpmetodologia);
        let metodologia: sgcsmetpmetodologia;
        try{
            metodologia = await metodologiaRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(404).json({message:'La metodologia no existe'});
        }
        metodologiaRepository.delete(id);
        return res.status(201).json({message:'Metodologia eliminada'})
    };
}

export default MetodologiaController