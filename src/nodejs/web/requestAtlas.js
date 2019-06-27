var atlasdb = require("../mapper/atlasdb");

function atlas(app) {
    app.get('/atlas', function(req, res) {
        res.redirect('/atlas.html');
    })
}

function authorAtlas(app) {
    app.get('/authorAtlas', function(req, res) {
        var response = req.query;
        req.session.authorAtlas = response;
        res.send('Success');
    })
}

function getAuthorAtlas(app) {
    app.get('/getAuthorAtlas', function(req, res) {
        if (typeof req.session.authorAtlas != 'undefined') {
            console.log(req.session.authorAtlas);
            var response = req.session.authorAtlas;
            atlasdb.getAuthorAtlas(response, req, res);
        } else {
            res.send('未选择');
        }
    })
}
exports.atlas = atlas;
exports.authorAtlas = authorAtlas;
exports.getAuthorAtlas = getAuthorAtlas;