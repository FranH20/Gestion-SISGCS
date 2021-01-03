import {Router} from 'express'
import EntregableProyectoController from '../controllers/entregableProyecto.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([1,2])],EntregableProyectoController.getEntregableProyectos);
router.get('/:id',[checkJwt,checkTipo([1,2])],EntregableProyectoController.getEntregableProyecto);
router.post('/miembro/',[checkJwt,checkTipo([1,2])],EntregableProyectoController.getEntregablexMiembro);
router.post('/',[checkJwt,checkTipo([1,2])],EntregableProyectoController.createEntregableProyecto);
router.put('/:id',[checkJwt,checkTipo([1,2])],EntregableProyectoController.updateEntregableProyecto);
router.delete('/:id',[checkJwt,checkTipo([1,2])],EntregableProyectoController.deleteEntregableProyecto);


export default router