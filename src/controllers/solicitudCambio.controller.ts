import {Request,Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcssolpsolicitudcambio} from '../entity/SolicitudCambio'
import {validate} from 'class-validator'

export class SolicitudCambioController {
    static getSolicitudCambios = async (req: Request, res:Response) => {
        const solicitudCambioRepository = getRepository(sgcssolpsolicitudcambio);
        let solicitudCambios;
        try {
            solicitudCambios = await solicitudCambioRepository.find({where:{"SOLvalor":1}});
        } catch(e) {
            return res.status(404).json({message:'Algo esta mal!'});
        }
        if (solicitudCambios.length > 0){
            res.send(solicitudCambios);
        }else{
            return res.status(404).json({message:'No se encontro nada!'});
        }
        
    };

    static getSolicitudCambio = async (req:Request,res:Response) => {
        const { id } = req.params;
        const solicitudCambioRepository = getRepository(sgcssolpsolicitudcambio);
        try{
            const solicitudCambio = await solicitudCambioRepository.findOne(id);
            res.send(solicitudCambio);
        } catch(e){
            res.status(404).json({message:'No se encontro'});
        }
    };
    
    static createSolicitudCambio = async (req:Request,res:Response) => {
        const {SOLcodigo,SOLfecha,SOLobjetivo,SOLdescripcion,SOLimpacto,SOLestado,pru,pro} = req.body;
        const solicitudCambio = new sgcssolpsolicitudcambio();
        solicitudCambio.SOLcodigo = SOLcodigo
        solicitudCambio.SOLfecha = SOLfecha
        solicitudCambio.SOLobjetivo = SOLobjetivo
        solicitudCambio.SOLdescripcion = SOLdescripcion
        solicitudCambio.SOLvalor = true
        solicitudCambio.SOLimpacto = SOLimpacto
        solicitudCambio.SOLestado = SOLestado
        solicitudCambio.pru = pru
        solicitudCambio.pro = pro

        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(solicitudCambio,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        
        const solicitudCambioRepository = getRepository(sgcssolpsolicitudcambio);  
        try{
            await solicitudCambioRepository.save(solicitudCambio)
        }
        catch(e){
            return res.status(409).json({message:'La SolicitudCambio ya existe'});
        }
        res.send('SolicitudCambio creada');
    };
    
    static updateSolicitudCambio = async (req:Request,res:Response) => {
        let solicitudCambio;
        const {id} = req.params;
        const {SOLcodigo,SOLfecha,SOLobjetivo,SOLdescripcion,SOLimpacto,SOLestado,pru,pro} = req.body;
        const solicitudCambioRepository = getRepository(sgcssolpsolicitudcambio);
        try{
            solicitudCambio = await solicitudCambioRepository.findOneOrFail(id);
            solicitudCambio.SOLcodigo = SOLcodigo
            solicitudCambio.SOLfecha = SOLfecha
            solicitudCambio.SOLobjetivo = SOLobjetivo
            solicitudCambio.SOLdescripcion = SOLdescripcion
            solicitudCambio.SOLimpacto = SOLimpacto
            solicitudCambio.SOLvalor = true
            solicitudCambio.SOLestado = SOLestado
            solicitudCambio.pru = pru
            solicitudCambio.pro = pro
        }
        catch(e){
            return res.status(404).json({message:'La SolicitudCambio no fue encontrado'});
        }
        const validationOpt = {validationError:{target:false,value:false}};
        const errors = await validate(solicitudCambio,validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }
        try{
            await solicitudCambioRepository.save(solicitudCambio)
        }
        catch(e){
            return res.status(404).json({message:'La SolicitudCambio ya existe'});
        }
        res.status(201).json({message:'SolicitudCambio actualizado'})
    };
    
    // static deleteSolicitudCambio = async (req:Request,res:Response) => {
    //     const {id} = req.params;
    //     const solicitudCambioRepository = getRepository(sgcssolpsolicitudcambio);
    //     let solicitudCambio: sgcssolpsolicitudcambio;
    //     try{
    //         solicitudCambio = await solicitudCambioRepository.findOneOrFail(id);
    //     }
    //     catch(e){
    //         return res.status(404).json({message:'La SolicitudCambio no existe'});
    //     }
    //     solicitudCambioRepository.delete(id);
    //     return res.status(201).json({message:'SolicitudCambio eliminada'})
    // };
    static deleteSolicitudCambio = async (req:Request,res:Response) => {
        let solicitudCambio;
        const {id} = req.params;
        const solicitudCambioRepository = getRepository(sgcssolpsolicitudcambio);
        try{
            solicitudCambio = await solicitudCambioRepository.findOneOrFail(id);
            solicitudCambio.SOLvalor = false
        }
        catch(e){
            return res.status(404).json({message:'La SolicitudCambio no fue encontrado'});
        }
        try{
            await solicitudCambioRepository.save(solicitudCambio)
        }
        catch(e){
            return res.status(404).json({message:'La SolicitudCambio ya existe'});
        }
        res.status(201).json({message:'SolicitudCambio desactivada'})
    };
    
}

export default SolicitudCambioController