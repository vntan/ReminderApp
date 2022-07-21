const account = require('../models/accountModels');

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




module.exports = {
    login, 
    loginWithGoogle,
    register,
}
