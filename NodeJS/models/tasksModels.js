var db = require('./connectDB')

var tasks = {
    showUserTasks: function (userID, cb) {
        return db.query("call showUserTasks(?);", [userID], cb)
    },

    addTasks: function (userID, taskInfo, cb) {
        return db.query("CALL addTask(?,?,?,?,?,?,?);", [
            userID, taskInfo.projectID, taskInfo.listID, taskInfo.nameTask, taskInfo.status, taskInfo.descriptionTask, taskInfo.dueDateTask
        ], cb)
    },

    addNotification: function (taskID, userID, reminder, cb) {
        return db.query("CALL addNotification(?,?,?);",
            [taskID, userID, reminder], cb)
    },

    addTag: function (taskID, nameTag, cb) {
        return db.query("CALL addTag(?,?);", [taskID, nameTag], cb)
    },

    addTaskParticipant: function (taskID, userID, cb) {
        return db.query("CALL addTaskParticipant(?,?);", [taskID, userID], cb)
    },

    addSubtasks: function (taskID, nameSubTask, statusSubtask, cb) {
        return db.query("CALL addSubtask(?,?,?);",
            [taskID, nameSubTask, statusSubtask], cb)
    },

    deleteTasks: function (taskID, cb) {
        return db.query("call deleteTask(?); ", [taskID], cb)
    },

    deleteNotification: function (taskID, userID, reminder, cb) {
        return db.query("CALL deleteNotification(?,?,?);", [taskID, userID, reminder], cb)
    },

    deleteTag: function (tagID, cb) {
        return db.query("call deleteTag(?); ", [tagID], cb)
    },

    deleteAllTag: function (taskID, cb) {
        return db.query("delete from tag where idTask = taskID; ", [taskID], cb)
    },


    deleteTaskParticipant: function (taskID, userID, cb) {
        return db.query("call deleteTaskParticipant(?, ?); ", [taskID, userID], cb)
    },

    deleteSubtasks: function (subTaskID, cb) {
        return db.query("call deleteSubtasks(?); ", [subTaskID], cb)
    },


    updateTasks: function (taskInfo, cb) {
        return db.query("CALL updateTask(?,?,?,?,?,?,?)", [
            taskInfo.taskID, taskInfo.projectID, taskInfo.listID, taskInfo.nameTask, taskInfo.status, taskInfo.descriptionTask, taskInfo.dueDateTask
        ], cb)
    },

    updateTaskProjectList: function (taskID, idProject, idList, cb) {
        return db.query("update task set idProject = ?, idList = ? where task.idTask = ?; ",
            [idProject, idList, taskID], cb)
    },

    updateTaskStatus: function (taskID, newStatus, cb) {
        return db.query("update task set status = ? where task.idTask = ?;",
            [newStatus, taskID], cb)
    },

}

module.exports = tasks