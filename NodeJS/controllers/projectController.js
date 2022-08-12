const project = require('../models/projectModel');

const showAllProject = (req, res) =>{
    console.log(req.body)

    const userID = req.body["userID"];
   
    if ( userID  ){
        project.showAllProject(userID, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const showProjectInfomation = (req, res) =>{
    console.log(req.body)

    const userID = req.body["userID"];
    const projectID = req.body["projectID"];
   
    if ( userID  && projectID){
        project.showProjectInfomation(userID, projectID, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: {
                "projectInfo": rows[0],
                "participants": rows[1],
                "listInformation": rows[2]
            }});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const addProject = (req, res) => {
    console.log(req.body)

    const userID = req.body["userID"];
    const nameProject = req.body["nameProject"];
    const description = req.body["description"];

    newProject = {nameProject,  description};
   
    if ( userID  && project){
        project.addProject(userID, newProject, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0] });
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const addParticipantToProject = (req, res) =>{
    console.log(req.body)

    const projectID = req.body["projectID"];
    const userIDAdmin = req.body["userIDAdmin"];
    const userIDAdd = req.body["userIDAdd"];
    const role = req.body["role"];

   
    if ( projectID && userIDAdmin && userIDAdd  && role){
        project.addParticipantToProject(projectID, userIDAdmin, userIDAdd, role, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, participants: rows[0]});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const deleteParticipantToProject = (req, res) =>{
    console.log(req.body)

    const projectID = req.body["projectID"];
    const userIDDelete = req.body["userIDDelete"];
    const role = req.body["role"];

   
    if ( projectID && userIDDelete  && role){
        project.deleteParticipantToProject(projectID, userIDDelete, role, (err)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const updateParticipantToProject = (req, res) =>{
    console.log(req.body)

    const projectID = req.body["projectID"];
    const userIDUpdate = req.body["userIDUpdate"];
    const role = req.body["role"];

   
    if ( projectID && userIDUpdate  && role){
        project.updateParticipantToProject(projectID, userIDUpdate, role, (err)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}


const deleteProject = (req, res) =>{
    console.log(req.body)

    const userID = req.body["userID"];
    const projectID = req.body["projectID"];
   
    if ( userID  && projectID){
        project.deleteProject(userID, projectID, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const editProject = (req, res) => {
    console.log(req.body)

    const userID = req.body["userID"];
    const projectID = req.body["projectID"];
    const nameProject = req.body["nameProject"];
    const description = req.body["description"];

    newProject = {projectID, nameProject,  description};
   
    if ( userID  && newProject){
        project.editProject(userID, newProject, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}



module.exports = {
    showAllProject,
    showProjectInfomation,
    addProject,
    addParticipantToProject,
    deleteParticipantToProject,
    updateParticipantToProject,
    deleteProject,
    editProject
}
