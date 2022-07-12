const express = require('express');
const accountController = require('../controllers/accountController');


const router = express.Router();

const initRoutesApp = (app) => {
    router.post('/accounts/login', accountController.login)
    router.post('/accounts/loginGoogle', accountController.loginWithGoogle)
    router.post('/accounts/register', accountController.register)
    router.post('/accounts/checkUserExist', accountController.checkUserExist)

    return app.use("/", router);
}

module.exports = initRoutesApp;