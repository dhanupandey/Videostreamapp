const { resolve } = require("path/win32");
const UserModel = require("./user.model");
const mailer  = require('./common');
EventEmitter = require ('events');

exports.createUser = function (data) {

    return new Promise(function (resolve, reject) {
        console.log("before save to db", data)
        data.email = data.email.toLowerCase();

        var userdata = UserModel(data)

        userdata.save().then(function (result) {
            console.log("res", result)
            resolve(result)
        }, function (error) {
            console.log("Error", error);
            if (error.code == 11000) {
                reject(error)
            }
            reject()
        });
    })
}

exports.findUser = function (data) {
    return new Promise(function (resolve, reject) {
        var queryObj = {
            email: data.email.toLowerCase(),
            password: data.password
        }
        UserModel.findOne(queryObj).then(function (result) {
            console.log("Finding user from db", result)
            if (result) {
                resolve(result)
            }
            else {
                reject("invalid crede")
            }
        }).catch(function (error) {
            reject()

        })
    }

    )
}

exports.deleteUserAccount = function (email) {
    console.log("email", email)
    return new Promise(function (resolve, reject) {

        UserModel.deleteOne({ email: email }).then(function (err) {
            console.log("Finding user from db")
            if (err && true) {
                resolve()

            }
            else {
                reject()
            }
        }).catch(function (error) {
            reject()

        }) 
    }

    )
}

exports.getpassword = function(body){
    console.log(body);
    return new Promise(function (resolve, reject) {
        var queryObj = {
            email: body.email
        }
        UserModel.findOne(queryObj).then(function(result) {
            console.log("Finding user from dbggg", result)
            if (result) {
                resolve(result)
                // console.log(result)
            }
            else {
                reject("invalid crede")
            }
        }).catch(function (error) {
            reject()

        })
    }

    )
    
    
//     mailer.mailPassword(body)
//   console.log("something")
}

exports.search = function(query){
    return new Promise(function (resolve, reject) {
        // var queryObj = {
        //     email: body.email.toLowerCase()
        // }
        UserModel.find(
            { "email": { "$regex": query.key, "$options": "i" } }
        ).then(function (result) {
            console.log("Finding user from db", result)
            if (result) {
                resolve(result)
                // console.log(result)
            }
            else {
                reject("invalid crede")
            }
        }).catch(function (error) {
            reject()

        })
    }

    )
}

exports.updateProfile = (data, cb)=>{
    var queryobj = {
        email: data.email
    }
    var updateobj = {
        "$set" :{
            image: data.image,
            name: data.name,
            profilecompleted: true
        }
    }

   console.log("email", data, queryobj.email)
    UserModel.findOneAndUpdate(queryobj, updateobj).then((result) =>{
        console.log("update user from db", result)
        cb(null, result)
    }).catch((err)=>{
        console.log("we have err" , err)
        cb(err, null)
    })
}

// exports.recoverPassword = (data)=>{
//     let emitter = new EventEmitter()
//     console.log("Here we are finding password of user")
//     var queryObj = {email:data.email}
//     UserModel.findOne(queryObj).then((result)=>{
//         console.log("result of db operation", result)
//         if(result){
//             return emitter.emit("MIl_GAYA" , result)
//         }
//         else{
//             return emitter.emit("NOT_FOUND")
//         }
//     }).catch((error)=>{
//         return emitter.emit("ERROR")
//     })

//     return emitter
// }

//exports.createUser 
