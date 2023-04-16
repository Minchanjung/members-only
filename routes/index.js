var express = require('express');
var router = express.Router();
const messageController = require("../controllers/messageController");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});*/

router.get("/", messageController.get_messages);

module.exports = router;
