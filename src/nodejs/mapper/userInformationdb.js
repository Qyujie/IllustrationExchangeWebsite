var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

function createUserInformationdb(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        var whereStr = { "id": response.id }; // 查询条件
        dbase.collection("userinformation").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            if (result.length == 0) {
                dbase.collection("user").find(whereStr).toArray(function(err, result) {
                    if (err) throw err;
                    var insertStr = {
                        "id": result[0].id,
                        "head_portrait": null,
                        "name": result[0].name,
                        "birthday": null,
                        "sex": null,
                        "phone": null,
                        "prefecture": null,
                        "introduce": null,
                        "address": null,
                        "real_name": null,
                        "id_card": null
                    };
                    dbase.collection("userinformation").insertOne(insertStr, function(err, res) {
                        if (err) throw err;
                        db.close();
                    });
                });
            } else {
                db.close();
            }
        });

    });
}

function addUserInformation(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        var whereStr = { "id": response.id }; // 查询条件
        var updateStrUI = {
            $set: response.information
        };
        var updateStrU = {
            $set: {
                "name": response.information.name
            }
        };
        dbase.collection("user").find({ "name": response.information.name }).toArray(function(err, result) {
            if (err) throw err;
            if (result.length != 0 && result[0].id != response.id) {
                res.send("已注册");
                db.close();
            } else {
                dbase.collection("userinformation").updateOne(whereStr, updateStrUI, function(err) {
                    if (err) throw err;
                    dbase.collection("user").updateOne(whereStr, updateStrU, function(err) {
                        if (err) throw err;
                        res.send("修改成功");
                        db.close();
                    });
                });
            }
        });
    });
}

function addHeadPortrait(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        var whereStr = { "id": response.id }; // 查询条件
        var updateStr = { $set: { "head_portrait": response.head_portrait } };
        dbase.collection("userinformation").updateOne(whereStr, updateStr, { upsert: true }, function(err) {
            if (err) throw err;
            var headPortrait = {
                "id": response.id,
                "head_portrait": response.head_portrait
            }
            res.send(headPortrait);
            db.close();
        });

    });
}

function getUserInformation(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        var whereStr = { "id": response.id }; // 查询条件
        dbase.collection("userinformation").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            var birthdayArr = new Array();
            if (result[0].birthday == null) {
                birthdayArr[0] = "";
                birthdayArr[1] = "";
                birthdayArr[2] = "";
            } else {
                birthdayArr = result[0].birthday.split("-");
            }
            var userinformation = {
                "id": result[0].id,
                "head_portrait": result[0].head_portrait,
                "name": result[0].name,
                "birthdayYear": birthdayArr[0],
                "birthdayMonth": birthdayArr[1],
                "birthdayDay": birthdayArr[2],
                "sex": result[0].sex,
                "phone": result[0].phone,
                "prefecture": result[0].prefecture,
                "introduce": result[0].introduce,
                "address": result[0].address,
                "real_name": result[0].real_name,
                "id_card": result[0].id_card
            };
            res.send(userinformation);
            db.close();
        });
    });
}

exports.createUserInformationdb = createUserInformationdb;
exports.addUserInformation = addUserInformation;
exports.addHeadPortrait = addHeadPortrait;
exports.getUserInformation = getUserInformation;