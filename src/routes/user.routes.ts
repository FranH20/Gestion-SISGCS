import {Router} from 'express'
import {checkJwt} from '../middleware/jwt'
import UserController from '../controllers/user.controller'
import {checkTipo} from '../middleware/tipo'
const router = Router()

router.get('/',[checkJwt,checkTipo([1])], UserController.getUsers);
router.get('/:id',[checkJwt,checkTipo([1])], UserController.getUser);
router.post('/',[checkJwt,checkTipo([1])], UserController.createUsers);
router.put('/:id',[checkJwt,checkTipo([1])], UserController.updateUser);
router.delete('/:id',[checkJwt,checkTipo([1])], UserController.deleteUser);

export default router