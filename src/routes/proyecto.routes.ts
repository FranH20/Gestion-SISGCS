import {Router} from 'express'
import ProyectoController from '../controllers/proyecto.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([1,2,3,5])],ProyectoController.getProyectos);
router.get('/jefe/',[checkJwt,checkTipo([1,2,3,5])],ProyectoController.getProyectosConJefe);
router.get('/:id',[checkJwt,checkTipo([1,2,3,5])],ProyectoController.getProyecto);
router.post('/',[checkJwt,checkTipo([1])],ProyectoController.createProyecto);
router.put('/:id',[checkJwt,checkTipo([1])],ProyectoController.updateProyecto);
router.delete('/:id',[checkJwt,checkTipo([1])],ProyectoController.deleteProyecto);


export default router