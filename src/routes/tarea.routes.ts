import {Router} from 'express'
import TareaController from '../controllers/tarea.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([2,3])],TareaController.getTareas);
router.get('/:id',[checkJwt,checkTipo([2,3])],TareaController.getTarea);
router.post('/miembro/',[checkJwt,checkTipo([2,3])],TareaController.getTareaxMiembro);
router.post('/',[checkJwt,checkTipo([2,3])],TareaController.createTarea);
router.put('/:id',[checkJwt,checkTipo([2,3])],TareaController.updateTarea);
router.delete('/:id',[checkJwt,checkTipo([2,3])],TareaController.deleteTarea);


export default router