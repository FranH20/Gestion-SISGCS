import {Router} from 'express'
import SolicituCambioController from '../controllers/solicitudCambio.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([1,4,5])],SolicituCambioController.getSolicitudCambios);
router.get('/:id',[checkJwt,checkTipo([1,4,5])],SolicituCambioController.getSolicitudCambio);
router.post('/',[checkJwt,checkTipo([1,4,5])],SolicituCambioController.createSolicitudCambio);
router.put('/:id',[checkJwt,checkTipo([1,4,5])],SolicituCambioController.updateSolicitudCambio);
router.delete('/:id',[checkJwt,checkTipo([1,4,5])],SolicituCambioController.deleteSolicitudCambio);


export default router