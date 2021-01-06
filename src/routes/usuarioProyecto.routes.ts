import {Router} from 'express'
import usuarioProyectoController from '../controllers/usuarioProyecto.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()


router.get('/miembro/',[checkJwt,checkTipo([1,2,3,5])],usuarioProyectoController.getMiembroxProyecto);
router.get('/proyecto/:id',[checkJwt,checkTipo([1,2,3,5])],usuarioProyectoController.getusuarioProyectoXProyecto);
router.get('/usuario/proyecto/:id',[checkJwt,checkTipo([1,2,3,5])],usuarioProyectoController.getProyectoxMiembro);
router.post('/',[checkJwt,checkTipo([1])],usuarioProyectoController.createUsuarioProyecto);
router.put('/:id',[checkJwt,checkTipo([1])],usuarioProyectoController.updateUsuarioProyecto);
router.delete('/:id',[checkJwt,checkTipo([1])],usuarioProyectoController.deleteUsuarioProyecto);

export default router