var usersModels = require('../models/usersModels')

let login = (req, res) =>{
    
}

let getAllUsers = (req, res) =>{
    usersModels.getAllUsers((err,rows) => {
        if(err){
            //console.log(err)
            res.json(err);
        } else {
            //console.log(row)
            res.json(rows);
        }
    })
}


module.exports = {
    login: login,
    getAllUsers: getAllUsers,
}
