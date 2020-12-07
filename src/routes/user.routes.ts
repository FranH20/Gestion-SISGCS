import {Router} from 'express'
import {checkJwt} from '../middleware/jwt'
import UserController from '../controllers/user.controller'
import {checkTipo} from '../middleware/tipo'
const router = Router()

router.get('/',[checkJwt,checkTipo(['Gestor de proyecto'])], UserController.getUsers);
router.get('/:id',[checkJwt,checkTipo(['Gestor de proyecto'])], UserController.getUser);
router.post('/',[checkJwt,checkTipo(['Gestor de proyecto'])], UserController.createUsers);
router.put('/:id',[checkJwt,checkTipo(['Gestor de proyecto'])], UserController.updateUser);
router.delete('/:id',[checkJwt,checkTipo(['Gestor de proyecto'])], UserController.deleteUser);

export default router