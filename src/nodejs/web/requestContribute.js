var contributedb = require("../mapper/contributedb");
var fs = require("fs");
var path = require("path");

function contribute(app) {
    app.get('/contribute', function(req, res) {
        res.redirect('/contribute.html');
    })
}

function uploadImg(app) {
    var upload = require('multer')({ dest: '../public/uploads/tmp/' });
    app.post('/uploadImg', upload.array('files', 20), function(req, res) {
        var files = req.files;
        var filesname = [];
        for (var i in files) {
            //获取上传图片的后缀名并以随机数作为文件名
            var extName = files[i].originalname.substring(files[i].originalname.lastIndexOf(".") + 1, files[i].originalname.length);
            var rundomNumber = Math.ceil(Math.random() * 10000000);
            var randomFileName = rundomNumber + "." + extName;

            filesname[i] = {
                "name": randomFileName,
                "likenum": parseInt(0)
            };
            //创建图片目录
            var imgFolder = "../public/uploads/users/" + req.session.userid + "/upload_img/";
            mkdirsSync(imgFolder);

            //图片路径
            var imgFile = imgFolder + randomFileName;

            //上传临时文件的路径
            var uploadedTempFilePath = "../public/" + files[i].path;

            //读取临时文件
            var data = fs.readFileSync(uploadedTempFilePath);
            //读取成功之后，复制到图片路径
            fs.writeFileSync(imgFile, data);
            //写成功之后，返回 img元素显示上传之后的图片,删除临时文件
            fs.unlinkSync(uploadedTempFilePath);
        }

        var upload_information = {

        };
        var response = {
            "id": req.session.userid,
            "upload_date": req.body.upload_date,
            "filesname": filesname,
            "work_attribute": req.body.work_attribute,
            "work_classification": req.body.work_classification,
            "work_title": req.body.work_title,
            "work_brief_introduction": req.body.work_brief_introduction
        };
        contributedb.uploadImg(response, req, res);
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

exports.contribute = contribute;
exports.uploadImg = uploadImg;