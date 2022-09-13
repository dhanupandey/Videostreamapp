const Express = require("express"); 
const router = Express.Router();
const VideoController = require("./video.controller");

router.post("/addvideo", VideoController.addVideo)
router.get("/getvideo", VideoController.findAllVideo)


module.exports = router



