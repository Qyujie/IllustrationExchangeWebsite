var collectionsdb = require("../mapper/collectionsdb");

function collections(app) {
    app.get('/collections', function(req, res) {
        res.redirect('/collections.html');
    })
}

function getCollections(app) {
    app.get('/getCollections', function(req, res) {
        if (req.session.userid) {
            var response = {
                "id": req.session.userid
            };
            var homedb = require("../mapper/homedb");
            homedb.getCollections(response, req, res);
        } else {
            res.send("未登录");
        }
    })
}


exports.collections = collections;
exports.getCollections = getCollections;