import {Router} from 'express'
import usuarioProyectoController from '../controllers/usuarioProyecto.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.post('/',[checkJwt,checkTipo([1])],usuarioProyectoController.createUsuarioProyecto);
router.put('/:id',[checkJwt,checkTipo([1])],usuarioProyectoController.updateUsuarioProyecto);
router.delete('/:id',[checkJwt,checkTipo([1])],usuarioProyectoController.deleteUsuarioProyecto);

export default router