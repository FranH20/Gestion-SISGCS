import {Router} from 'express'
import SolicituCambioController from '../controllers/solicitudCambio.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',SolicituCambioController.getSolicitudCambios);
router.get('/:id',SolicituCambioController.getSolicitudCambio);
router.post('/',SolicituCambioController.createSolicitudCambio);
router.put('/:id',SolicituCambioController.updateSolicitudCambio);
router.delete('/:id',SolicituCambioController.deleteSolicitudCambio);


export default router