import verifyToken from '../middlewares/verify_token'


module.exports = app => {
    const express = require('express');
    const controllers = require('../controllers/user');
    const router = express.Router()
    //public router

    router.use(verifyToken)

    //private router
    // router.use(isAdmin)


    router.get('/', controllers.getCurrent) // hoặc viết như này cho gọn router.get('/', [verifyToken, isAdmin], controllers.getCurrent)
    
    app.use('/api/v1/user', router);
}