var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

function uploadImg(response, req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbase = db.db("dynamicweb");
        var insertOneStr = {
            "id": response.id,
            "date": response.upload_date,
            "filesname": response.filesname,
            "work_attribute": response.work_attribute,
            "work_classification": response.work_classification,
            "work_title": response.work_title,
            "work_brief_introduction": response.work_brief_introduction
        }
        dbase.collection("contribute").insertOne(insertOneStr, function(err) {
            if (err) throw err;
            res.send("Success");
            db.close();
        });
    });
}

exports.uploadImg = uploadImg;