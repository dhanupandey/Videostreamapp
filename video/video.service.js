const { resolve } = require("path/win32")
const VideoModel = require("./video.model")
exports.createVideo = (data)=>{
    return new Promise((resolve,reject)=>{
        console.log("Data received for creating video", data)
        data.videoid = Math.floor(100000000 + Math.random() * 900000000)+Date.now()
        console.log("checking video id for a record" , data.videoid)
        var videodata = new VideoModel(data)
        videodata.save().then((result)=>{
            console.log("resukt of saving video into db" , result)
            resolve(result)
        }).catch((error)=>{
            reject()
            console.log("Error in saving video into db" , error)
        })
    })
}

exports.getAllvideo = ()=>{
    return new Promise((resolve, reject)=>{
        console.log("inside service")
        VideoModel.find({}).then((result)=>{
            if(result)
            {
                console.log("result=",result)
           resolve(result);
            }
            else{
                console.log("sjjsjdsjssakjhjsaijijsjisjijsskskk........dhanu")
                reject();
            }
        })
    })
}