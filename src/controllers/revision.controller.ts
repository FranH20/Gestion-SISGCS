import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsrevpprevision} from '../entity/Revision'
import {validate} from 'class-validator'

export class RevisionController {
    static getRevisiones = async (req: Request, res:Response) => {
        const revisionRepository = getRepository(sgcsrevpprevision);
        let revisions;
        try {
            revisions = await revisionRepository.find();
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (revisions.length > 0){
            res.send(revisions);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getRevision = async (req:Request,res:Response) => {
        const { id } = req.params;
        const revisionRepository = getRepository(sgcsrevpprevision);
        try{
            const revision = await revisionRepository.findOne(id);
            res.send(revision);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    };
    
    static createRevision = async (req:Request,res:Response) => {
        const {REVfecha,REVnombre,REVmotivo,REVpredecesor,REVestado,REVdetalle,pre} = req.body;
        const revision = new sgcsrevpprevision();
        revision.REVfecha = REVfecha
        revision.REVnombre = REVnombre
        revision.REVmotivo = REVmotivo
        revision.REVpredecesor = REVpredecesor
        revision.REVestado = REVestado
        revision.REVdetalle = REVdetalle
        revision.pre = pre

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(revision,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const revisionRepository = getRepository(sgcsrevpprevision);  
        try{
            await revisionRepository.save(revision)
        }
        catch(e){
            return res.status(409).json({message:'La revision ya existe'});
        }
        res.send('Revision creada');
    };
    
    static updateRevision = async (req:Request,res:Response) => {
        let revision;
        const {id} = req.params;
        const {REVfecha,REVnombre,REVmotivo,REVpredecesor,REVestado,REVdetalle,pre} = req.body;
        const revisionRepository = getRepository(sgcsrevpprevision);
        try{
            revision = await revisionRepository.findOneOrFail(id);
            revision.REVfecha = REVfecha
            revision.REVnombre = REVnombre
            revision.REVmotivo = REVmotivo
            revision.REVpredecesor = REVpredecesor
            revision.REVestado = REVestado
            revision.REVdetalle = REVdetalle
            revision.pre = pre
        }
        catch(e){
            return res.status(404).json({message:'La revision no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(revision,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await revisionRepository.save(revision)
        }
        catch(e){
            return res.status(404).json({message:'La revision ya existe'});
        }
        res.status(201).json({message:'Revision actualizada'})
    };
    
    static deleteRevision = async (req:Request,res:Response) => {
        const {id} = req.params;
        const revisionRepository = getRepository(sgcsrevpprevision);
        let revision: sgcsrevpprevision;
        try{
            revision = await revisionRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(404).json({message:'La revision no existe'});
        }
        revisionRepository.delete(id);
        return res.status(201).json({message:'Revision eliminada'})
    };
}

export default RevisionController