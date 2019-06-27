var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

function getNewWorks(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        dbase.collection("contribute").find().count(function(err, count) {
            if (err) throw err;
            var dycount = count;
            if (response.worksShownum == 0) {
                dycount = 0;
            }
            var sortStr = {
                "_id": -1
            };
            dbase.collection("contribute").find().limit(20).skip(parseInt(response.worksShownum) + dycount - parseInt(response.worksnum)).sort(sortStr).toArray(
                function(err, result) {
                    if (err) throw err;
                    var i = 0;
                    getNameAndPortrait(i, result, count, db, res);
                });
        });
    });
}

function getRankWorks(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        dbase.collection("contribute").find().count(function(err, count) {
            if (err) throw err;
            var dycount = count;
            if (response.worksShownum == 0) {
                dycount = 0;
            }
            var sortStr = {
                "filesname.likenum": -1,
                "_id": -1
            };
            dbase.collection("contribute").find().limit(20).skip(parseInt(response.worksShownum) + dycount - parseInt(response.worksnum)).sort(sortStr).toArray(
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

function getCollections(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        var whereStr = { "id": parseInt(response.id) }
        dbase.collection("collections").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            if (typeof result[0] == 'undefined') {
                result[0] = { "works": [] };
            }
            res.send(result[0]);
            db.close();
        });
    });
}

function like(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        var whereStr = { "filesname.name": response.name };
        var updateStr = { "filesname.$.likenum": parseInt(response.like) };
        dbase.collection("contribute").findOneAndUpdate(whereStr, { $inc: updateStr }, function(err, result) {
            if (err) throw err;
            var works = {
                "id": result.value.id,
                "date": result.value.date,
                "name": response.name,
                "title": result.value.work_title
            };

            whereStr = { "id": works.id };
            dbase.collection("userinformation").find(whereStr).toArray(function(err, result) {
                if (err) throw err;
                works.head_portrait = result[0].head_portrait;
                works.author = result[0].nanme;

                whereStr = { "id": req.session.userid };
                if (response.like == '1') {
                    updateStr = { $addToSet: { "works": works } };
                } else {
                    updateStr = { $pull: { "works": works } };
                }

                dbase.collection("collections").updateOne(whereStr, updateStr, { upsert: true },
                    function(err) {
                        if (err) throw err;
                        res.send('Success');
                        db.close();
                    });
            });
        });
    });
}


exports.getNewWorks = getNewWorks;
exports.getRankWorks = getRankWorks;
exports.getCollections = getCollections;
exports.like = like;