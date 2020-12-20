import {Router} from 'express'
import RevisionController from '../controllers/revision.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([1,2,3,4,5])],RevisionController.getRevisiones);
router.get('/:id',[checkJwt,checkTipo([1,2,3,4,5])],RevisionController.getRevision);
router.post('/',[checkJwt,checkTipo([1,2,3,4,5])],RevisionController.createRevision);
router.put('/:id',[checkJwt,checkTipo([1,2,3,4,5])],RevisionController.updateRevision);
router.delete('/:id',[checkJwt,checkTipo([1,2,3,4,5])],RevisionController.deleteRevision);

export default router