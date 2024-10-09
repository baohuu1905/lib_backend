import * as services from '../services/auth'
import { internalSeverError, badRequest } from '../middlewares/handle_errors'
import{login} from '../services/auth'
import { getOne } from '../services/user'
// import { email, password } from '../helppers/joi_schema'
// import joi from 'joi'


const getCurrent = async (req, res) => {
    try {
        const {id} = req.user
        const response = await getOne(id);
        return res.status(200).json(response);
    } catch(error) {
        console.log(error);
        return internalSeverError(res);
    }
}

module.exports = {
    getCurrent
}