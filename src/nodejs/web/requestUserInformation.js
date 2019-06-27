var userInformationdb = require("../mapper/userInformationdb");
var fs = require("fs");
var path = require("path");

function userInformation(app) {
    app.get('/userInformation', function(req, res) {
        res.redirect('/userInformation.html');
    })
}

function uploadPhoto(app) {
    var upload = require('multer')({ dest: '../public/uploads/tmp/' });
    app.post('/uploadPhoto', upload.single('file'), function(req, res) {
        //获取上传图片的后缀名
        var extName = req.file.originalname.substring(req.file.originalname.lastIndexOf(".") + 1, req.file.originalname.length);

        //随机数
        var rundomNumber = Math.ceil(Math.random() * 10000000);

        //以随机数作为文件名
        var randomFileName = rundomNumber + "." + extName;

        //创建图片目录
        var imgFolder = "../public/uploads/users/" + req.session.userid + "/head_portrait/";
        mkdirsSync(imgFolder);

        //图片路径
        var imgFile = imgFolder + randomFileName;

        //上传临时文件的路径
        var uploadedTempFilePath = "../public/" + req.file.path;

        //读取临时文件
        fs.readFile(uploadedTempFilePath, function(err, data) {
            //读取成功之后，复制到图片路径
            fs.writeFile(imgFile, data, function(err) {
                //写成功之后，返回 img元素显示上传之后的图片,删除临时文件
                fs.unlink(uploadedTempFilePath, function(err) {
                    if (err) throw err;
                });
                var response = {
                    "id": req.session.userid,
                    "head_portrait": randomFileName
                }
                userInformationdb.addHeadPortrait(response, req, res);
            });
        });
    })
}


function addUserInformation(app) {
    app.post('/addUserInformation', function(req, res) {
        var response = {
            "id": req.session.userid,
            "information": {
                "name": req.body.name,
                "birthday": req.body.birthday,
                "sex": req.body.sex,
                "phone": req.body.phone,
                "prefecture": req.body.prefecture,
                "introduce": req.body.introduce,
                "address": req.body.address,
                "real_name": req.body.real_name,
                "id_card": req.body.id_card
            }
        };
        userInformationdb.addUserInformation(response, req, res);

    })
}

function getUserInformation(app) {
    app.get('/getUserInformation', function(req, res) {
        if (req.cookies.userid) {
            req.session.userid = parseInt(req.cookies.userid);
            res.cookie('userid', req.session.userid, { maxAge: 60 * 60 * 1000, singed: true });
            response = {
                "id": req.session.userid
            }
            userInformationdb.getUserInformation(response, req, res);
        } else {
            res.send("null");
        }
    })
}

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
exports.userInformation = userInformation;
exports.addUserInformation = addUserInformation;
exports.uploadPhoto = uploadPhoto;
exports.getUserInformation = getUserInformation;