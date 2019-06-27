var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

function getHeadPortrait(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        dbase.collection("userinformation").find(response).toArray(function(err, result) {
            if (err) throw err;
            if (result[0].head_portrait == null) {
                res.send("nullHeadPortrait");
                db.close();
            } else {
                var headPortrait = {
                    "id": response.id,
                    "head_portrait": result[0].head_portrait
                };
                res.send(headPortrait);
                db.close();
            }
        });
    });
}

exports.getHeadPortrait = getHeadPortrait;