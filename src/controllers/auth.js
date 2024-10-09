

import {register1} from '../services/auth'
import { internalSeverError, badRequest } from '../middlewares/handle_errors'
import{login} from '../services/auth'
import { email, password } from '../helppers/joi_schema'
import joi from 'joi'


const registerHandler = async (req, res) => {
    try {
        const {error} = joi.object({email, password}).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await register1(req.body);
        return res.status(200).json(response);
    } catch(error) {
        console.log(error);
        return internalSeverError(res);
    }
}

const loginHandler = async (req, res) => {
    try {
        const {error} = joi.object({email, password}).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await login(req.body);
        return res.status(200).json(response);
    } catch(error) {
        console.log(error);
        return internalSeverError(res);
    }
}

module.exports = {
    register: registerHandler,
    login: loginHandler,
};
