var express = require('express');
var path = require('path')

var app = express();
var CACHETIME = 60 * 1000 * 60 * 24 * 30;
app.use(express.static(path.join(__dirname, '../public'), { maxAge: CACHETIME })) //指定静态文件位置

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var sessionParser = require('express-session');
app.use(sessionParser({
    secret: 'session',
    name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    // cookie: { maxAge: 3600000 }, //设置maxAge是3600000ms，即1h后session和相应的cookie失效过期
    resave: true,
    saveUninitialized: false,
}));

var server = app.listen(8080);

function start(handle, router) {
    for (var pathname in handle) {
        router.route(handle, pathname, app);
    }
    // var MongoClient = require('mongodb').MongoClient;
    // var url = 'mongodb://localhost:27017';
    // MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    //     if (err) throw err;
    //     var dbase = db.db("dynamicweb");
    //     insertStr = {
    //         "uname": "user",
    //         "uid": 0
    //     }
    //     dbase.collection("user").insertOne(insertStr, function(err) {
    //         if (err) throw err;
    //         db.close();
    //     });
    // });
}
exports.start = start;