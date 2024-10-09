import * as services from '../services/auth'
import { internalSeverError, badRequest } from '../middlewares/handle_errors'
import { insertData } from '../services/insert'


const insertData2 = async (req, res) => {
    try {
        const response = await insertData()
        return res.status(200).json(response);
    } catch(error) {
        return internalSeverError(res);
    }
}

module.exports = {
    insertData2
}