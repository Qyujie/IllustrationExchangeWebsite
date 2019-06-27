var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

function getAuthorAtlas(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        var whereStr = {
            "filesname.name": response.name
        }
        dbase.collection("contribute").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            getNameAndPortrait(result, db, res)
        });
    });
}

function getNameAndPortrait(result, db, res) {
    var dbase = db.db("dynamicweb");
    dbase.collection("userinformation").find({ "id": result[0].id }).toArray(function(err, result2) {
        if (err) throw err;
        result[0].name = result2[0].name;
        result[0].head_portrait = result2[0].head_portrait;

        res.send(result);
        db.close();
    });
}
exports.getAuthorAtlas = getAuthorAtlas;