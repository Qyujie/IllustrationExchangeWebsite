var userdb = require("../mapper/userdb");

function login(app) {
    app.get('/login', function(req, res) {
        res.redirect('/login.html');
    })

}

function verificationUser(app) {
    app.post('/verificationUser', function(req, res) {
        response = {
            "name": req.body.name,
            "password": req.body.password
        };
        userdb.verificationUser(response, req, res);
    });
}

function addUser(app) {
    app.post('/addUser', function(req, res) {
        response = {
            "name": req.body.name,
            "password": req.body.password
        };
        userdb.addUser(response, req, res);

    })
}




exports.login = login;
exports.verificationUser = verificationUser;
exports.addUser = addUser;