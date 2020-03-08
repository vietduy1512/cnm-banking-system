var http = require("http");

exports.template = function (req, res) {
    console.log("authen success");
    res.render('index');
}