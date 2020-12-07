import {Router} from 'express'
import {checkJwt} from '../middleware/jwt'
import AuthController from '../controllers/auth.controller'
import {checkTipo} from '../middleware/tipo'
const router = Router()
//login
router.post('/login', AuthController.login)
//cmabiar contrasenia
router.post('/change-password',[checkJwt,checkTipo(['Gestor de proyecto'])],AuthController.changePassword)
export default router