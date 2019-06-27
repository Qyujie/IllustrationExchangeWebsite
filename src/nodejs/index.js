var server = require("./server");
var router = require("./web/router");
var handle = {}

var rhLogin = require("./web/requestLogin"); //登录界面
handle["/login"] = rhLogin.login;
handle["/verificationUser"] = rhLogin.verificationUser;
handle["/addUser"] = rhLogin.addUser;

var rhUserInformation = require("./web/requestUserInformation"); //用户信息
handle["/userInformation"] = rhUserInformation.userInformation;
handle["/addUserInformation"] = rhUserInformation.addUserInformation;
handle["/uploadPhoto"] = rhUserInformation.uploadPhoto;
handle["/getUserInformation"] = rhUserInformation.getUserInformation;

var rhHome = require("./web/requestHome"); //主页
handle["/home"] = rhHome.home;
handle["/getNewWorks"] = rhHome.getNewWorks;
handle["/getRankWorks"] = rhHome.getRankWorks;
handle["/getCollections"] = rhHome.getCollections;
handle["/like"] = rhHome.like;

var rhOriginal = require("./web/requestOriginal"); //原创
handle["/original"] = rhOriginal.original;
handle["/getOgNewWorks"] = rhOriginal.getOgNewWorks;
handle["/getOgRankWorks"] = rhOriginal.getOgRankWorks;

var rhCreations = require("./web/requestCreations"); //同人
handle["/creations"] = rhCreations.creations;
handle["/getCtNewWorks"] = rhCreations.getCtNewWorks;
handle["/getCtRankWorks"] = rhCreations.getCtRankWorks;

var rhAtlas = require("./web/requestAtlas"); //图集
handle["/atlas"] = rhAtlas.atlas;
handle["/authorAtlas"] = rhAtlas.authorAtlas;
handle["/getAuthorAtlas"] = rhAtlas.getAuthorAtlas;

var rhCommon = require("./web/requestCommon"); //公共导航栏
handle["/getHeadPortrait"] = rhCommon.getHeadPortrait;
handle["/exit"] = rhCommon.exit;

var rhContribute = require("./web/requestContribute"); //投稿页面
handle["/contribute"] = rhContribute.contribute;
handle["/uploadImg"] = rhContribute.uploadImg;

var rhCollections = require("./web/requestCollections"); //收藏页面
handle["/collections"] = rhCollections.collections;
handle["/getCollections"] = rhCollections.getCollections;

server.start(handle, router);