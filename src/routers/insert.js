import * as controllers from '../controllers/insert.js'
import express from 'express';

module.exports = app => {
    const router = express.Router()


    router.get('/', controllers.insertData2)
    app.use('/api/v1/insert', router);
}