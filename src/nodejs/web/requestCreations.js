var creationsdb = require("../mapper/creationsdb");

function creations(app) {
    app.get('/creations', function(req, res) {
        res.redirect('/creations.html');
    })
}

function getCtNewWorks(app) {
    app.get('/getCtNewWorks', function(req, res) {
        console.log('getCtNewWorks');
        var response = {
            "worksnum": req.query.worksnum,
            "worksShownum": req.query.worksShownum
        };
        creationsdb.getCtNewWorks(response, req, res);
    })
}

function getCtRankWorks(app) {
    app.get('/getCtRankWorks', function(req, res) {
        var response = {
            "worksnum": req.query.worksnum,
            "worksShownum": req.query.worksShownum
        };
        creationsdb.getCtRankWorks(response, req, res);
    })
}

exports.creations = creations;
exports.getCtNewWorks = getCtNewWorks;
exports.getCtRankWorks = getCtRankWorks;