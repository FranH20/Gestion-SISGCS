import {Router} from 'express'
import RolController from '../controllers/rol.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([1])],RolController.getRoles);
router.get('/:id',[checkJwt,checkTipo([1])],RolController.getRol);
router.post('/',[checkJwt,checkTipo([1])],RolController.createRol);
router.put('/:id',[checkJwt,checkTipo([1])],RolController.updateRol);
router.delete('/:id',[checkJwt,checkTipo([1])],RolController.deleteRol);


export default router