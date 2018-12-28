var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('error', { message: 'This is a experiment', error: {status: 200, stack: "responseData"}});
    // res.render('index', { title: 'Express', data: "responseData" });
});

module.exports = router;
