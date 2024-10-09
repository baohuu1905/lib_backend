const express = require('express');
const cors = require('cors');
const initRouter = require('./src/routers/index');


const db = require('./connect_db')
require('dotenv').config();


const app = express();
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

initRouter(app)

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const PORT = process.env.PORT || 8080
const listener = app.listen(PORT, () => {
    console.log('Sever is running on the port ' + listener.address().port);
})

module.exports = app;
