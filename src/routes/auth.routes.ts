import {Router} from 'express'
import {checkJwt} from '../middleware/jwt'
import AuthController from '../controllers/auth.controller'
import {checkTipo} from '../middleware/tipo'
const router = Router()
//login
router.post('/login', AuthController.login)
//cambiar contrasenia
router.post('/change-password',[checkJwt,checkTipo([1])],AuthController.changePassword)
//obtener perfil
router.post('/profile', [checkJwt],AuthController.profile)
export default router