import {Router} from 'express'
import EntregableController from '../controllers/entregable.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([1])],EntregableController.getEntregables);
router.get('/:id',[checkJwt,checkTipo([1])],EntregableController.getEntregable);
router.post('/',[checkJwt,checkTipo([1])],EntregableController.createEntregable);
router.put('/:id',[checkJwt,checkTipo([1])],EntregableController.updateEntregable);
router.delete('/:id',[checkJwt,checkTipo([1])],EntregableController.deleteEntregable);


export default router