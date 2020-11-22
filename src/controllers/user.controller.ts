import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {sgcsusutusuario} from '../entity/User'

export const getUsers = async (req:Request,res:Response): Promise<Response> => {
    const users = await getRepository(sgcsusutusuario).find();
    return res.json(users)
}

export const getUser = async (req:Request,res:Response): Promise<Response> => {
    const result = await getRepository(sgcsusutusuario).findOne(req.params.id);
    return res.json(result)

}

export const createUsers = async (req:Request,res:Response): Promise<Response> => {
    const newUser = getRepository(sgcsusutusuario).create(req.body);
    const results = await getRepository(sgcsusutusuario).save(newUser);
    return res.json(results)
}

export const updateUser = async (req:Request,res:Response): Promise<Response> => {
    const user = await getRepository(sgcsusutusuario).findOne(req.params.id);
    if (user) {
        getRepository(sgcsusutusuario).merge(user, req.body);
        const results = await getRepository(sgcsusutusuario).save(user);
        return res.json(results)
    }

    return res.status(404).json({msg : 'Not user found'})
}

export const deleteUser = async (req:Request,res:Response): Promise<Response> => {
    const users = await getRepository(sgcsusutusuario).delete(req.params.id);
    return res.json(users)
}
