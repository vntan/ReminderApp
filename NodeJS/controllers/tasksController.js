const tasks = require('../models/tasksModels');

const getTasks = (req, res) => {
    console.log(req.body)
    const userID = req.body["userID"]
    
    if (userID) {
        tasks.getTasks(userID, (err, rows) => {
            if (err) res.json({ onSuccess: false, error: err });
            else res.json({ onSuccess: true, result: rows });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}


const addTasks = (req, res) => {
    console.log(req.body)

    const userID = req.body["userID"]
    const idProject = req.body["idProject"]
    const idList = req.body["idList"]
    const name = req.body["name"]
    const status = req.body["status"]
    const description = req.body["description"]
    const dueDate = req.body["dueDate"]

    const taskInfo = { userID, idProject, idList, name, status, description, dueDate }



    if (taskInfo) {
        tasks.addTasks(taskInfo, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const deleteTasks = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    
    if (taskID) {
        tasks.deleteTasks(taskID, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const updateTasks = (req, res) => {
    console.log(req.body)

    const taskID = req.body["taskID"]
    const idProject = req.body["idProject"]
    const idList = req.body["idList"]
    const name = req.body["name"]
    const status = req.body["status"]
    const description = req.body["description"]
    const dueDate = req.body["dueDate"]

    const taskInfo = { taskID, idProject, idList, name, status, description, dueDate }

    if (taskInfo) {
        tasks.updateTasks(taskInfo, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const updateTaskProjectList = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    const idProject = req.body["idProject"]
    const idList = req.body["idList"]
    
    if (taskID && idProject && idList) {
        tasks.updateTaskProjectList(taskID, idProject, idList, (err, rows) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const updateTaskStatus = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    const newStatus = req.body["status"] 
    
    
    if (taskID && newStatus) {
        tasks.updateTaskStatus(taskID, newStatus, (err, rows) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

module.exports = {
    getTasks,
    addTasks,
    deleteTasks,
    updateTasks,
    updateTaskProjectList,
    updateTaskStatus,

}
