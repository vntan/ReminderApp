const account = require('../models/accountModel');

const login = (req, res) =>{
    console.log(req.body)

    const email = req.body["email"];
    const password = req.body["password"];
    if ( email && password  ){
        account.login(email, password, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        });
    }
    else res.json({onSuccess: false, error: "Can't receive the data"});
}

const loginWithGoogle = (req, res) => {
    console.log(req.body)

    const name = req.body["name"];
    const email = req.body["email"];
    const password = req.body["password"];
    const urlImage = req.body["urlImage"];

    user = {name, email, password, urlImage}
    
    if (user){
        account.loginWithGoogle(user, (err,rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        });
    }
    else res.json({onSuccess: false, result: "Cannot receive the data"});
}

const register = (req, res) => {
    console.log(req.body)

    const name = req.body["name"];
    const email = req.body["email"];
    const password = req.body["password"];
    const urlImage = req.body["urlImage"];

    user = {name, email, password, urlImage}
    
    if (user){
        account.register(user, (err, rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        });
    }
    else res.json({onSuccess: false, result: "Cannot receive the data"});
}


const updateUserInformation = (req, res) => {
    console.log(req.body)

    const id = req.body["id"];
    const name = req.body["name"];
    const password = req.body["password"];
    const urlImage = req.body["urlImage"];

    user = {id, name, password, urlImage}
    
    if (user){
        account.updateUserInformation(user, (err)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true});
        });
    }
    else res.json({onSuccess: false, result: "Cannot receive the data"});
}

const deleteUser = (req, res) => {
    console.log(req.body)

    const idUser = req.body["id"];

    
    if (idUser){
        account.deleteUser(idUser, (err)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true});
        });
    }
    else res.json({onSuccess: false, result: "Cannot receive the data"});
}

const getUserID = (req, res) =>{
    console.log(req.body)

    const email = req.body["email"];

    
    if (email){
        account.getUserID(email, (err, rows)=>{
            if(err) res.json({onSuccess: false, error: err.sqlMessage});
            else res.json({onSuccess: true, result: rows[0]});
        });
    }
    else res.json({onSuccess: false, result: "Cannot receive the data"});
}


module.exports = {
    login, 
    loginWithGoogle,
    register,
    updateUserInformation,
    deleteUser,
    getUserID
}
