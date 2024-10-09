
module.exports = app => {
const express = require('express');
const controllers = require('../controllers/auth');
const router = express.Router()

router.post("/register", controllers.register)
router.post("/login", controllers.login)
app.use('/api/v1/auth', router);
}
    

//module.exports = router
// import auth from "../controllers/auth";

// const initAuthRouter = (app) => {

//     app.use('/api/v1/auth/register', auth.register)
//     app.use('/api/v1/auth/login', auth.login)


//     return app.use('/', (req, res) =>{
//         return res.send('sever on');
//     })
// }
// module 