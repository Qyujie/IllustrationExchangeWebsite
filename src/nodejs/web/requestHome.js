var homedb = require("../mapper/homedb");

function home(app) {
    app.get('/home', function(req, res) {
        res.redirect('/home.html');
    })
}

function getNewWorks(app) {
    app.get('/getNewWorks', function(req, res) {
        var response = {
            "worksnum": req.query.worksnum,
            "worksShownum": req.query.worksShownum
        };
        homedb.getNewWorks(response, req, res);
    })
}

function getRankWorks(app) {
    app.get('/getRankWorks', function(req, res) {
        var response = {
            "worksnum": req.query.worksnum,
            "worksShownum": req.query.worksShownum
        };
        homedb.getRankWorks(response, req, res);
    })
}

function getCollections(app) {
    app.get('/getCollections', function(req, res) {
        if (req.session.userid) {
            var response = {
                "id": req.session.userid
            };
            homedb.getCollections(response, req, res);
        } else {
            res.send("未登录");
        }
    })
}

function like(app) {
    app.get('/like', function(req, res) {
        var response = req.query;
        homedb.like(response, req, res);
    })
}


exports.home = home;
exports.getNewWorks = getNewWorks;
exports.getRankWorks = getRankWorks;
exports.getCollections = getCollections;
exports.like = like;