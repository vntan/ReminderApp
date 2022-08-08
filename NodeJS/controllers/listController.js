const list = require('../models/listModel');

const showList = (req, res) =>{
    console.log(req.body)

    const userID = req.body["userID"];
   
    if ( userID  ){
        list.showList(userID, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const addListToProject = (req, res) =>{
    console.log(req.body)

    const projectID = req.body["projectID"];
    const nameList = req.body["nameList"];
   
    if ( projectID && nameList  ){
        list.addListToProject(projectID, nameList, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}


const addListToUser = (req, res) =>{
    console.log(req.body)

    const userID = req.body["userID"];
    const nameList = req.body["nameList"];
   
    if ( userID && nameList  ){
        list.addListToUser(userID, nameList, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const deleteList = (req, res) =>{
    console.log(req.body)

    const listID = req.body["listID"];
   
    if (listID){
        list.deleteList(listID, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const editList = (req, res) =>{
    console.log(req.body)

    const listID = req.body["listID"];
    const nameList = req.body["nameList"];
   
    if ( listID && nameList  ){
        list.editList(listID, nameList, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true});
        })
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

module.exports = {
    showList,
    addListToProject,
    addListToUser,
    deleteList,
    editList
}
