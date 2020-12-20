import {Router} from 'express'
import MetodologiaController from '../controllers/metodologia.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([1])],MetodologiaController.getMetodologias);
router.get('/:id',[checkJwt,checkTipo([1])],MetodologiaController.getMetodologia);
router.post('/',[checkJwt,checkTipo([1])],MetodologiaController.createMetodologia);
router.put('/:id',[checkJwt,checkTipo([1])],MetodologiaController.updateMetodologia);
router.delete('/:id',[checkJwt,checkTipo([1])],MetodologiaController.deleteMetodologia);


export default router