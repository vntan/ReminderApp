var db = require('./connectDB')

var tasks ={
    getTasks: function(userID, cb){
        return db.query("select * from taskInfomation where idAccount = ?; ", [userID], cb)
    },

    addTasks: function(taskInfo, cb){
        return db.query("CALL addTask(?,?,?,?,?,?,?)", [
            taskInfo.userID, taskInfo.idProject, taskInfo.idList, taskInfo.name, taskInfo.status, taskInfo.description, taskInfo.dueDate 
        ], cb)
    },

    deleteTasks: function(taskID, cb){
        return db.query("delete from task where idTask = ?; ", [taskID], cb)
    },

    updateTasks: function(taskInfo, cb){
        return db.query("CALL updateTask(?,?,?,?,?,?,?)", [
            taskInfo.userID, taskInfo.idProject, taskInfo.idList, taskInfo.name, taskInfo.status, taskInfo.description, taskInfo.dueDate 
        ], cb)
    },

    updateTaskProjectList: function(taskID, idProject, idList, cb){
        return db.query("update task set idProject = ?, idList = ? where task.idTask = ?; ", 
                        [idProject, idList, taskID], cb)
    },

    updateTaskStatus: function(taskID, newStatus, cb){
        return db.query("update task set status = ? where task.idTask = ?;", 
                [newStatus, taskID], cb)
    },

}

module.exports = tasks