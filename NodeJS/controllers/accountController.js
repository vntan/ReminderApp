var acccount = require('../models/accountModels')

const login = (req, res) =>{
    console.log(req.body)

    const email = req.body["email"];
    const password = req.body["password"];
    if ( email && password  ){
        acccount.login(email, password, (err,rows)=>{
            
            if(err) res.json({onSuccess: false, error: err});
            else  {
                if (rows.length <= 0) res.json({onSuccess: false, error: "Can't find the account"});
                else res.json({onSuccess: true, result: rows});
            }

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

        acccount.checkUserExist(email, (err,rows)=>{
            if(err) res.json({onSuccess: false, result: err});
            else {
                if (rows[0]["countUser"] > 0) {
                    acccount.getUserInformation(email, (err,rows)=>{
                        if(err) res.json({onSuccess: false, error: err});
                        else  {
                            if (rows.length <= 0) res.json({onSuccess: false, error: "Can't get the account"});
                            else res.json({onSuccess: true, result: rows});
                        }
                    });
                    return;
                }

                acccount.register(user, (err, count)=>{

                    if(err) res.json({onSuccess: false, error: err});
                    else  {
                        if (rows.length <= 0) res.json({onSuccess: false, error: "Can't register the account"});
                        else {
                            acccount.getUserInformation(email, (err,rows)=>{
                                if(err) res.json({onSuccess: false, error: err});
                                else  {
                                    if (rows.length <= 0) res.json({onSuccess: false, error: "Can't get the account"});
                                    else res.json({onSuccess: true, result: rows});
                                }
                            });
                            
                        }
                    }
                });
            }
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

        acccount.checkUserExist(email, (err,rows)=>{
            if(err) res.json({onSuccess: false, result: err});
            else {
                if (rows[0]["countUser"] > 0) {
                    res.json({onSuccess: false, result: "User has already existed!"});
                    return;
                }
                acccount.register(user, (err, count)=>{

                    if(err) res.json({onSuccess: false, error: err});
                    else  {
                        if (rows.length <= 0) res.json({onSuccess: false, error: "Can't register the account"});
                        else {
                            acccount.getUserInformation(email, (err,rows)=>{
                                if(err) res.json({onSuccess: false, error: err});
                                else  {
                                    if (rows.length <= 0) res.json({onSuccess: false, error: "Can't get the account"});
                                    else res.json({onSuccess: true, result: rows});
                                }
                            });
                            
                        }
                    }
                });
            }
        });


    }
    else res.json({onSuccess: false, result: "Cannot receive the data"});
}


let checkUserExist = (req, res)=> {
    console.log(req.body)

    const email = req.body["email"];

    if ( email ){
        acccount.checkUserExist(email, (err,rows)=>{
            if(err) res.json({onSuccess: false, result: err});
            else res.json({onSuccess: true, result: rows[0]["countUser"] > 0});
        });
    }
    else res.json({onSuccess: false, result: "Cannot receive the data"});
}
// let getAllUsers = (req, res) =>{
//     usersModels.getAllUsers((err,rows) => {
//         if(err){
//             //console.log(err)
//             res.json(err);
//         } else {
//             //console.log(row)
//             res.json(rows);
//         }
//     })
// }


module.exports = {
    login, 
    loginWithGoogle,
    register,
    checkUserExist,

    // getAllUsers: getAllUsers,
}
