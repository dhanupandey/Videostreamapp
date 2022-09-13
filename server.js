const Express = require('express');
const path = require("path");
const cors = require("cors")
const fs = require("fs")
const mongoose = require("mongoose")
const dburl = "mongodb://localhost:27017/brilliodb5"

// new way to import express
// import Express from "express";

const server = Express();
const cosrsOption = {
    exposedHeaders : 'Auth'
};
server.use(cors(cosrsOption))

server.use(Express.static(path.resolve(__dirname, "./build")))
server.use(Express.json());
server.use('/user', require("./user"))
server.use('/video', require("./video"))

// server.get("/", (req, res)=>{
// res.sendFile(path.resolve(__dirname, "./build/index.html"));
// })
// server.get("/login", (req, res)=>{
//    console.log(fs.readFile("./user.txt", 'utf8', (error, data)=>{
//     if(error)
//     {
//         console.log(error);
//     }
//     else{
//         console.log(typeof(data));
//         let name_obj = JSON.parse(data);
//         console.log(typeof(name_obj));
//         if(name_obj.name == 'dhanu')
//         {
//             console.log("valid user")
//         }
//         else{
//             console.log("invalid user")
//         }
        
//         res.json("done")
//     }
//    }))
//     })

// server.post("/signup", (req, res)=>{
//     req.body.name;
//     console.log(req.body.name)
//     console.log(req.body)
//     fs.writeFile("user.txt", JSON.stringify(req.body), (error)=>{
//          console.log("error in writing file", error)
//          if(error)
//          {
//             res.status(500).send()
//          }
//          else{
//             res.send("Done")
//          }
//     })
//     // res.json(req.body);
// })


server.listen(3001, ()=>{
    mongoose.connect(dburl, function(error, client){
        if(error)
        {
            console.log("err", error)
        }
        else{
            console.log("connected")
        }
    })
    console.log("I am running");
});

// call back
// pooja(shipu)  poja will call function shipu once she is done
// shipu says to pooja that call me back when u are done