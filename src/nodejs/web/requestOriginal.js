var originaldb = require("../mapper/originaldb");

function original(app) {
    app.get('/original', function(req, res) {
        res.redirect('/original.html');
    })
}

function getOgNewWorks(app) {
    app.get('/getOgNewWorks', function(req, res) {
        var response = {
            "worksnum": req.query.worksnum,
            "worksShownum": req.query.worksShownum
        };
        originaldb.getOgNewWorks(response, req, res);
    })
}

function getOgRankWorks(app) {
    app.get('/getOgRankWorks', function(req, res) {
        var response = {
            "worksnum": req.query.worksnum,
            "worksShownum": req.query.worksShownum
        };
        originaldb.getOgRankWorks(response, req, res);
    })
}

exports.original = original;
exports.getOgNewWorks = getOgNewWorks;
exports.getOgRankWorks = getOgRankWorks;