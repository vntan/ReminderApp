const express = require('express');
const accountController = require('../controllers/accountController');
const projectController = require('../controllers/projectController');
const listController = require('../controllers/listController');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

const initRoutesApp = (app) => {
    router.post('/accounts/login', accountController.login)
    router.post('/accounts/loginGoogle', accountController.loginWithGoogle)
    router.post('/accounts/register', accountController.register)
    router.post('/accounts/updateUser', accountController.updateUserInformation)
    router.post('/accounts/deleteUser', accountController.deleteUser)
    router.post('/accounts/getUserID', accountController.getUserID)
    

    router.post('/projects/showAllProject', projectController.showAllProject)
    router.post('/projects/showProjectInfomation', projectController.showProjectInfomation)
    router.post('/projects/addProject', projectController.addProject)
    router.post('/projects/addParticipantToProject', projectController.addParticipantToProject)
    router.post('/projects/deleteParticipantToProject', projectController.deleteParticipantToProject)
    router.post('/projects/deleteProject', projectController.deleteProject)
    router.post('/projects/editProject', projectController.editProject)

    router.post('/lists/showList', listController.showList)
    router.post('/lists/addListToProject', listController.addListToProject)
    router.post('/lists/addListToUser', listController.addListToUser)
    router.post('/lists/deleteList', listController.deleteList)
    router.post('/lists/editList', listController.editList)




    // router.post('/tasks/getTasks', tasksController.getTasks)
    // router.post('/tasks/addTasks', tasksController.addTasks)
    // router.post('/tasks/deleteTasks', tasksController.deleteTasks)
    // router.post('/tasks/updateTasks', tasksController.updateTasks)
    // router.post('/tasks/updateTaskProjectList', tasksController.updateTaskProjectList)
    // router.post('/tasks/updateTaskStatus', tasksController.updateTaskStatus)
    
 
    return app.use("/", router);
}

module.exports = initRoutesApp;