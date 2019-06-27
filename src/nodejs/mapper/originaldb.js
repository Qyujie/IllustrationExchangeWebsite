var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

function getOgNewWorks(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");

        var whereStr = {
            "work_attribute": "1"
        };

        dbase.collection("contribute").find(whereStr).count(function(err, count) {
            if (err) throw err;
            var dycount = count;
            if (response.worksShownum == 0) {
                dycount = 0;
            }

            var sortStr = {
                "_id": -1
            };
            dbase.collection("contribute").find(whereStr).limit(16).skip(parseInt(response.worksShownum) + dycount - parseInt(response.worksnum)).sort(sortStr).toArray(
                function(err, result) {
                    if (err) throw err;
                    var i = 0;
                    getNameAndPortrait(i, result, count, db, res);
                });
        });
    });
}

function getOgRankWorks(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        dbase.collection("contribute").find().count(function(err, count) {
            if (err) throw err;
            var dycount = count;
            if (response.worksShownum == 0) {
                dycount = 0;
            }
            var whereStr = {
                "work_attribute": "1"
            };
            var sortStr = {
                "filesname.likenum": -1,
                "_id": -1
            };
            dbase.collection("contribute").find(whereStr).limit(16).skip(parseInt(response.worksShownum) + dycount - parseInt(response.worksnum)).sort(sortStr).toArray(
                function(err, result) {
                    if (err) throw err;
                    var i = 0;
                    getNameAndPortrait(i, result, count, db, res);
                });
        });
    });
}

function getNameAndPortrait(i, result, count, db, res) {
    var id = result[i].id;
    var dbase = db.db("dynamicweb");
    dbase.collection("userinformation").find({ "id": id }).toArray(function(err, result2) {
        if (err) throw err;
        result[i].name = result2[0].name;
        result[i].head_portrait = result2[0].head_portrait;

        if (i == result.length - 1) {
            result.push({ "count": count });
            res.send(result);
            db.close();
        } else {
            i++;
            getNameAndPortrait(i, result, count, db, res);
        }
    });
}

exports.getOgNewWorks = getOgNewWorks;
exports.getOgRankWorks = getOgRankWorks;