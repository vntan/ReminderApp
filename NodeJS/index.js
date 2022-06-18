const express = require('express');
const bodyParser = require('body-parser');
const initRoutesApp = require('./routes/routesApp');
require('dotenv').config();


const app = express();

//Config App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

initRoutesApp(app);

let port = process.env.PORT || 4848;
app.listen(port, ()=>{
    console.log(`Backend is listening on port ${port}`)
    
})


