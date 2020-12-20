import {Router} from 'express'
import usuarioProyectoController from '../controllers/usuarioProyecto.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.post('/',usuarioProyectoController.createUsuarioProyecto);
router.put('/:id',usuarioProyectoController.updateUsuarioProyecto);
router.delete('/:id',usuarioProyectoController.deleteUsuarioProyecto);

export default router