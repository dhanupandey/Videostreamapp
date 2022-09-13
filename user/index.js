const Express = require("express"); 
const router = Express.Router();
const UserController = require("./user.controller")
const jwt = require('jsonwebtoken');
const { response } = require("express");

router.post("/register", UserController.sandesh)
router.post("/login", UserController.login)
router.post("/getPassword", UserController.findpassword)
router.post("/upload", UserController.uploadprofileImage)
router.get("/search", UserController.searchUser)
router.delete("/deleteaccount", function(req, res, next){
    var token = req.get("Auth")
    console.log(token)
    try {
        var payload = jwt.verify(token, 'shhhhh')
    }
     catch(e){
        console.log("token is not valid", e);
        res.status(401).send()
     }
     if(payload)
     { req.body.email = payload.email
        next()
     }
},UserController.deleteAccount)

router.put("/updateprofile", function(req, res, next){
   var token = req.get("Auth")

   console.log("token", token)
   try {
       var payload = jwt.verify(token, 'shhhhh')
   }
    catch(e){
       console.log("token is not valid", e);
       res.status(401).send()
    }
    if(payload)
    { req.body.email = payload.email
       next()
    }
},UserController.updateuser)

module.exports = router

// module.exports will overwrite all the exports .....export is use to send object


// JWT AUTH
// 1) Login 2) creating jwt 3) send that jwt in response header 4) when we need that then we need to send it in req 
// header  5) in server recv token and verify   6)  if verify then recv req