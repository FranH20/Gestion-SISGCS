import {Router} from 'express'
import EtapaController from '../controllers/etapa.controller'
import {checkTipo} from '../middleware/tipo'
import {checkJwt} from '../middleware/jwt'
const router = Router()

router.get('/',[checkJwt,checkTipo([1])],EtapaController.getEtapas);
router.get('/:id',[checkJwt,checkTipo([1])],EtapaController.getEtapa);
router.get('/metodologia/:id',[checkJwt,checkTipo([1])],EtapaController.getEtapasxMetodologia);
router.post('/',[checkJwt,checkTipo([1])],EtapaController.createEtapa);
router.put('/:id',[checkJwt,checkTipo([1])],EtapaController.updateEtapa);
router.delete('/:id',[checkJwt,checkTipo([1])],EtapaController.deleteEtapa);


export default router