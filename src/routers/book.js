import verifyToken from '../middlewares/verify_token'
import {isAdmin, isModeratorOrAdmin} from '../middlewares/verify_role.js'
import {uploadLocal, compressImage, uploadToCloudinary } from '../middlewares/uploader.js'
module.exports = app => {
    const express = require('express');
    const controllers = require('../controllers/book.js');
    const router = express.Router()


    router.get('/', controllers.getBookControllers) // hoặc viết như này cho gọn router.get('/', [verifyToken, isAdmin], controllers.getCurrent)
    // router.use(verifyToken)
    // router.use(isModeratorOrAdmin)
    router.post('/create', uploadLocal.single('image'), compressImage, uploadToCloudinary , controllers.createNewBook);
    router.put('/update', uploadLocal.single('image'), compressImage, uploadToCloudinary , controllers.updateBook);
    router.delete('/delete', controllers.deleteBook)
    
    app.use('/api/v1/book', router);
}