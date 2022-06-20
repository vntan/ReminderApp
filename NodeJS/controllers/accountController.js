var acccount = require('../models/accountModels')

let login = (req, res) =>{
    console.log(req.body)

    const email = req.body["email"];
    const password = req.body["password"];
    if ( email && password  ){
        acccount.login(email, password, (err,rows)=>{
            
            if(err) res.json({onSuccess: false, result: err});
            else  res.json({onSuccess: true, result: rows});

        });
    }
    else res.json({onSuccess: false, result: "Cannot receive the data"});
}

let register = (req, res) => {
    console.log(req.body)

    const name = req.body["name"];
    const email = req.body["email"];
    const password = req.body["password"];
    const urlImage = req.body["urlImage"];

    user = {name, email, password, urlImage}
    
    if (user){
        acccount.register(user, (err, count)=>{
            if(err) res.json({onSuccess: false, result: err});
            else res.json({onSuccess: true, result: count["affectedRows"]});
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
    register,
    checkUserExist,

    // getAllUsers: getAllUsers,
}
