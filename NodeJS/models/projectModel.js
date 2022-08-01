var db = require('./connectDB')

var project ={
    showAllProject: function(userID, cb){
        return db.query("call showAllProject(?);", [userID], cb)
    },

    showProjectInfomation: function(userID, projectID, cb){
        return db.query("call getProjectInformation(?, ?);", [userID, projectID], cb)
    },

    addProject: function(userID, project, cb){
        return db.query("call addProject(?, ?, ?)", 
            [userID, project.nameProject, project.description], cb);
    },
    
    addParticipantToProject: function (projectID, userIDAdmin, userIDAdd, role, cb) {
        return db.query("call addParticipantToProject(?, ?, ?, ?)", 
            [projectID, userIDAdmin, userIDAdd, role], cb);
    },

    deleteProject:  function (projectID, userID, cb) {
        return db.query("call deleteProject(?, ?)", 
            [projectID, userID], cb);

    },

    editProject: function(userID, project, cb){
        return db.query("call editProject(?, ?, ?, ?)", 
            [userID, project.projectID ,project.nameProject, project.description], cb);
    }


}

module.exports = project