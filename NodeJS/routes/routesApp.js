const express = require('express');
const usersController = require('../controllers/usersController')

const router = express.Router();

const initRoutesApp = (app) => {
    router.get('/', usersController.getAllUsers)


    return app.use("/", router);
}

module.exports = initRoutesApp;