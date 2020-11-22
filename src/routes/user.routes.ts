import {Router} from 'express'
const router = Router()

import {getUsers,createUsers,getUser,updateUser,deleteUser} from '../controllers/user.controller'

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router