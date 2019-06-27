var commondb = require("../mapper/commondb");

function getHeadPortrait(app) {
    app.get('/getHeadPortrait', function(req, res) {
        if (req.cookies.userid) {
            req.session.userid = parseInt(req.cookies.userid);
            res.cookie('userid', req.session.userid, { maxAge: 60 * 60 * 1000, singed: true });
            response = {
                "id": req.session.userid
            }
            commondb.getHeadPortrait(response, req, res);
        } else {
            res.send("null");
        }
    })
}

function exit(app) {
    app.get('/exit', function(req, res) { //销毁session和cookie
        req.session.destroy();
        res.cookie('userid', "", { maxAge: 0, singed: true });
        res.redirect('/login.html');
    })
}

exports.getHeadPortrait = getHeadPortrait;
exports.exit = exit;