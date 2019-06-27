var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

function verificationUser(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        dbase.collection("user").find({ "name": response.name }).toArray(function(err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.send("未注册");
                db.close();
            } else {
                dbase.collection("user").find(response).toArray(function(err, result) {
                    if (err) throw err;
                    if (result.length == 0) {
                        res.send("密码错误");
                        db.close();
                    } else {
                        req.session.userid = result[0].id;
                        res.cookie('userid', req.session.userid, { maxAge: 60 * 1000, singed: true });
                        res.send("登录成功");
                        db.close();
                    }
                });
            }
        });

    });
}

function addUser(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        dbase.collection("user").find({ "name": response.name }).toArray(function(err, result) {
            if (err) throw err;
            if (result.length == 0) {
                dbase.collection("user").updateOne({ "uname": "user" }, { $inc: { "uid": 1 } }, function() {

                    findStr = { "uname": "user" };
                    dbase.collection("user").find(findStr).toArray(function(err, result) {
                        if (err) throw err;
                        dbase.collection("user").insertOne({
                            id: result[0].uid,
                            "name": response.name,
                            "password": response.password
                        }, function(err) {
                            if (err) throw err;
                            res.send("注册成功");

                            var id = {
                                "id": result[0].uid
                            }
                            var userInformationdb = require("../mapper/userInformationdb");
                            userInformationdb.createUserInformationdb(id, req, res);
                        });
                    });
                });
            } else {
                res.send("已注册");
                db.close();
            }
        });
    });
}

exports.verificationUser = verificationUser;
exports.addUser = addUser;