const VideoService = require("./video.service")
exports.addVideo = (req,res)=>{
    console.log("data received in body", req.body)
    VideoService.createVideo(req.body).then((result)=>{
        res.send({
            message:"Video Added"
        })
    }).catch((error)=>{
        res.status(500).send()
    })
}

exports.findAllVideo = (req, res)=>{
    console.log("inside controller")
        VideoService.getAllvideo().then((result)=>{
            console.log("inside controller")
            res.json(result);
        }).catch((error)=>{
            res.status(500).send()
        })
}