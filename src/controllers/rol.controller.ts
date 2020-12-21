import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsroltrol} from '../entity/Role'
import {validate} from 'class-validator'

export class RolController {
    static getRoles = async (req: Request, res:Response) => {
        const rolRepository = getRepository(sgcsroltrol);
        let rols;
        try {
            rols = await rolRepository.find({where:{"ROLestado":1}});
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (rols.length > 0){
            res.send(rols);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getRol = async (req:Request,res:Response) => {
        const { id } = req.params;
        const rolRepository = getRepository(sgcsroltrol);
        try{
            const rol = await rolRepository.findOne(id);
            res.send(rol);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    };
    
    static createRol = async (req:Request,res:Response) => {
        const {ROLdescripcion,ROLestado} = req.body;
        const rol = new sgcsroltrol();
        rol.ROLdescripcion = ROLdescripcion
        rol.ROLestado = ROLestado

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(rol,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const rolRepository = getRepository(sgcsroltrol);  
        try{
            await rolRepository.save(rol)
        }
        catch(e){
            return res.status(409).json({message:'La rol ya existe'});
        }
        res.send('Rol creado');
    };
    
    static updateRol = async (req:Request,res:Response) => {
        let rol;
        const {id} = req.params;
        const {ROLdescripcion,ROLestado} = req.body;
        const rolRepository = getRepository(sgcsroltrol);
        try{
            rol = await rolRepository.findOneOrFail(id);
            rol.ROLdescripcion = ROLdescripcion
            rol.ROLestado = ROLestado
        }
        catch(e){
            return res.status(404).json({message:'La rol no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(rol,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await rolRepository.save(rol)
        }
        catch(e){
            return res.status(404).json({message:'La rol ya existe'});
        }
        res.status(201).json({message:'Rol actualizada'})
    };
    
    // static deleteRol = async (req:Request,res:Response) => {
    //     const {id} = req.params;
    //     const rolRepository = getRepository(sgcsroltrol);
    //     let rol: sgcsroltrol;
    //     try{
    //         rol = await rolRepository.findOneOrFail(id);
    //     }
    //     catch(e){
    //         return res.status(404).json({message:'La rol no existe'});
    //     }
    //     rolRepository.delete(id);
    //     return res.status(201).json({message:'Rol eliminada'})
    // };

    static deleteRol = async (req:Request,res:Response) => {
        let rol;
        const {id} = req.params;
        const rolRepository = getRepository(sgcsroltrol);
        try{
            rol = await rolRepository.findOneOrFail(id);
            rol.ROLestado = false
        }
        catch(e){
            return res.status(404).json({message:'La rol no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(rol,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await rolRepository.save(rol)
        }
        catch(e){
            return res.status(404).json({message:'La rol ya existe'});
        }
        res.status(201).json({message:'Rol desactivado'})
    };
    
}

export default RolController