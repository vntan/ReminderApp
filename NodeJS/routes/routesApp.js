const express = require('express');
const accountController = require('../controllers/accountController');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

const initRoutesApp = (app) => {
    router.post('/accounts/login', accountController.login)
    router.post('/accounts/loginGoogle', accountController.loginWithGoogle)
    router.post('/accounts/register', accountController.register)

    router.post('/tasks/getTasks', tasksController.getTasks)
    router.post('/tasks/addTasks', tasksController.addTasks)
    router.post('/tasks/deleteTasks', tasksController.deleteTasks)
    router.post('/tasks/updateTasks', tasksController.updateTasks)
    router.post('/tasks/updateTaskProjectList', tasksController.updateTaskProjectList)
    router.post('/tasks/updateTaskStatus', tasksController.updateTaskStatus)

    return app.use("/", router);
}

module.exports = initRoutesApp;