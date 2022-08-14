const tasks = require('../models/tasksModels');

const showUserTasks = (req, res) => {
    console.log(req.body)
    const userID = req.body["userID"]
    console.log(userID)

    if (userID) {
        tasks.showUserTasks(userID, (err, rows) => {
            if (err) res.json({ onSuccess: false, error: err });
            else res.json({
                onSuccess: true, result: {
                    "TaskInformation": rows[0],
                    "TaskParticipant": rows[1],
                    "TaskNotification": rows[2],
                    "SubTasks": rows[3],
                    "Tags": rows[4],
                }
            });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const showProjectTasks = (req, res) => {
    console.log(req.body)
    const userID = req.body["userID"]
    const projectID = req.body["projectID"]
    const listID = req.body["listID"]

    if (userID && projectID && listID) {
        tasks.showProjectTasks(userID, projectID, listID, (err, rows) => {
            if (err) res.json({ onSuccess: false, error: err });
            else res.json({ onSuccess: true, result: rows });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}


const addTasks = (req, res) => {
    console.log(req.body)

    const userID = req.body["userID"]
    const projectID = req.body["projectID"]
    const listID = req.body["listID"]
    const nameTask = req.body["nameTask"]
    const status = req.body["status"]
    const descriptionTask = req.body["descriptionTask"]
    const dueDateTask = req.body["dueDateTask"]

    const taskInfo = { projectID, listID, nameTask, status, descriptionTask, dueDateTask }

    if (userID && taskInfo) {
        tasks.addTasks(userID, taskInfo, (err, rows) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({
                onSuccess: true,
                data: {
                    taskID: rows[0][0].idTask
                }
            });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const addNotification = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    const userID = req.body["userID"]
    const reminder = req.body["reminder"]

    if (taskID && userID && reminder) {
        tasks.addNotification(taskID, userID, reminder, (err, rows) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true, data: rows[0] });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const addTag = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    const nameTag = req.body["nameTag"]

    if (taskID && nameTag) {
        tasks.addTag(taskID, nameTag, (err, rows) => {
            console.log(err, rows)
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true, data: rows[0] });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const addTaskParticipant = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    const userID = req.body["userID"]

    if (taskID && userID) {
        tasks.addTaskParticipant(taskID, userID, reminder, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const addSubtasks = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    const nameSubTask = req.body["nameSubTask"]
    const statusSubtask = req.body["statusSubtask"]

    // console.log(taskID, nameSubTask, statusSubtask, taskID && nameSubTask && statusSubtask)

    if (taskID && nameSubTask) {
        tasks.addSubtasks(taskID, nameSubTask, statusSubtask, (err, rows) => {
            // console.log(rows, err)
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true, data: rows[0] });
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

const deleteNotification = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    const userID = req.body["userID"]
    const reminder = req.body["reminder"]

    if (taskID && userID && reminder) {
        tasks.deleteNotification(taskID, userID, reminder, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const deleteTag = (req, res) => {
    console.log(req.body)
    const tagID = req.body["tagID"]

    if (tagID) {
        tasks.deleteTag(tagID, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const deleteAllTag = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]

    if (taskID) {
        tasks.deleteAllTag(taskID, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}


const deleteTaskParticipant = (req, res) => {
    console.log(req.body)
    const taskID = req.body["taskID"]
    const userID = req.body["userID"]

    if (taskID && userID) {
        tasks.deleteTaskParticipant(taskID, userID, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const deleteSubtasks = (req, res) => {
    console.log(req.body)
    const subTaskID = req.body["subTaskID"]

    if (tagID) {
        tasks.deleteSubtasks(subTaskID, (err) => {
            if (err) res.json({ onSuccess: false, error: err["sqlMessage"] });
            else res.json({ onSuccess: true });
        });
    }
    else res.json({ onSuccess: false, error: "Can't receive the data" });
}

const updateTasks = (req, res) => {
    console.log(req.body)

    const taskID = req.body["taskID"]
    const projectID = req.body["projectID"]
    const listID = req.body["listID"]
    const nameTask = req.body["nameTask"]
    const status = req.body["status"]
    const descriptionTask = req.body["descriptionTask"]
    const dueDateTask = req.body["dueDateTask"]

    const taskInfo = { taskID, projectID, listID, nameTask, status, descriptionTask, dueDateTask }

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
    showUserTasks,
    showProjectTasks,
    addTasks,
    addNotification,
    addTag,
    addTaskParticipant,
    addSubtasks,
    deleteTasks,
    deleteNotification,
    deleteTag,
    deleteAllTag,
    deleteTaskParticipant,
    deleteSubtasks,
    updateTasks,
    updateTaskProjectList,
    updateTaskStatus
}
