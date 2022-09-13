const userService = require("./user.service")
const mailer  = require('./common')
const jwt = require('jsonwebtoken');
const deleteAccount = require("./")
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Image')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')
exports.sandesh = function (req, res){
    
 userService.createUser(req.body).then(function(result){
     
     mailer.mail(req.body.email)
    res.send({

        message: "created user"
    })
 }, function(error){
    if(error){
        console.log("err", error )
        res.status(409).send({
            message: "user exists"
        })
    }
    else{
        res.status(500).send()
    }
   
 })
}

exports.login = function(req, res){
    userService.findUser(req.body).then(function(result){

        var payload =  {
            email : req.body.email.toLowerCase()
        }
       var token = jwt.sign(payload, 'shhhhh');
       console.log(token);
       res.setHeader("Auth", token);
        res.send({
            msg: "succ",
            response:result
        })
    }, function(error){
        if(error){
            res.status(500).send({
                msg: "invalid"
            })
        }
        else{
            res.status(500).send()
        }
    })
}

exports.deleteAccount = function(req, res){
    
    userService.deleteUserAccount(req.body.email)
   // console.log(req.body.email)
  res.send({msg:"delete"})
}

exports.findpassword = function(req, res){
     userService.getpassword(req.body).then(function(result){
        console.log("Finding user from db", result)
        mailer.mailPassword(result)
        //res.send({msg : "success"})
        res.json({data: result})
    });
     
    //  res.send({
    //     msg : "success-> check mail to get password"
    //  })
}

// exports.recoverPassword = (req,res)=>{
//     UserService.recoverPassword(req.body)
//     .once("NOT_FOUND", function(){
//         res.status(500).send({
//             message:"No Such Email Exists"
//         })
//     })
//     .once("MIl_GAYA", function(result){
//         CommonService.sendPassword(req.body.email,result.password).then(()=>{
//             res.send({
//                 message:"Password Sent to your Email"
//             })
//         }).catch(()=>{
//             res.status(500).send()
//         })
//     })
//     .once("ERROR", ()=>{
//         res.status(500).send()
//     })
// }

exports.searchUser = function(req, res){
    userService.search(req.query).then(function(result){
       console.log("Finding user from db", result)
       
       //res.send({msg : "success"})
       res.json({data: result})
   }).catch(function(){
    res.status(500)
   });
    
   //  res.send({
   //     msg : "success-> check mail to get password"
   //  })
}

exports.uploadprofileImage = (req, res)=>{
    upload(req,res, (err) =>{
        if(err){
            console.log("errrrrrrrrrrr")
            res.sendStatus(500);
        }
        console.log("noerrrrrrrrrrrr")
        res.send(req.file);
    });
}

exports.updateuser = function(req, res){
    userService.updateProfile(req.body, function(err, result){
      if(result){
        console.log("I am updated", result)
        res.send({ update: result})
        // res.status(204).send({
        //     update: result
        // })
      }
      else{
        console.log("I am updated", err)
      }
    })
}