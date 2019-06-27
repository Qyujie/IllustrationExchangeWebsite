$(function() {
    var worksnum = 0; //标记已显示的当前作品总数量
    var worksShownum = 0; //标记已显示的作品数量
    var sign = [];
    var pageGet = "getOgNewWorks";
    getworks(pageGet);

    $(".loadmore").click(function() {
        getworks(pageGet);
    });

    $("#newWorks").click(function() {
        $("#imgs").empty();
        if ($(".loadmore").html() == "已经没有了哦") {
            $(".loadmore").html("点击加载更多");
            $(".loadmore").click(function() {
                getworks(pageGet);
            });
        }
        worksnum = 0;
        worksShownum = 0;
        pageGet = "getOgNewWorks";
        getworks(pageGet);
    });

    $('#rankWorks').click(function() {
        $("#imgs").empty();
        if ($(".loadmore").html() == "已经没有了哦") {
            $(".loadmore").html("点击加载更多");
            $(".loadmore").click(function() {
                getworks(pageGet);
            });
        }
        worksnum = 0;
        worksShownum = 0;
        pageGet = "getOgRankWorks";
        getworks(pageGet);
    });



    function getworks(pageGet) {
        $.get(
            pageGet, {
                "worksnum": worksnum,
                "worksShownum": worksShownum,
            },
            function(worksresult) {
                var divWidth = window.innerWidth * 0.8;
                var width = (divWidth - 15 * 3 - 20 * 2) / 4;
                $("#div-home").width(divWidth);
                if (worksresult.length != 1) {
                    var i = 0;
                    if (pageGet == "getNewWorks") {
                        var sort = false;
                    } else {
                        var sort = true;
                    }
                    show(i, worksresult, width, sort);
                }
            }
        );
    }

    function show(i, result, width, sort) {
        var id = result[i].id;
        var date = result[i].date;
        var headPortraitsrc = '/uploads/users/' + id + '/head_portrait/' + result[i].head_portrait;
        var max = 0;
        sign[i] = 0;
        for (var k in result[i].filesname) {
            if (result[i].filesname[k].likenum > max) {
                max = result[i].filesname[k].likenum;
                sign[i] = k;
            }
        }
        var likenum = max;
        var filename = result[i].filesname[sign[i]].name
        var worksrc = '/uploads/users/' + id + '/upload_img/' + filename;
        var title = result[i].work_title;
        var author = result[i].name;

        var img_url = worksrc + '?' + Date.parse(new Date());
        var img = new Image();
        img.src = img_url;
        img.onload = function() {
            var imgWidth = img.width;
            var imgHeight = img.height;

            if (imgWidth >= imgHeight) {
                imgHeight = imgHeight / imgWidth * width;
                imgWidth = width;
            } else {
                imgWidth = imgWidth / imgHeight * width;
                imgHeight = width;
            }

            $("#imgs").append(
                '<div class="div-img">' +
                '    <div class="img"  style="background-image:url(' + worksrc + ')">' +
                '        <img src=' + worksrc + ' width="' + imgWidth + '" height="' + imgHeight +
                '        " value="' + filename + '"></img>' +
                '        <span class="like glyphicon glyphicon-heart"></span>' +
                '        <span class="likenum">' + likenum + '</span>' +
                '    </div>' +
                '    <div class="div-title">' +
                '        <span class="title">' + title +
                '        </span>' +
                '    </div>' +
                '    <div class="div-date"> ' +
                '        <span class="date">' + date + '</span> ' +
                '    </div>' +
                '    <div class="div-author">' +
                '        <div class="authorhead"  style="background-image:url(' + headPortraitsrc + ')"></div>' +
                '        <a class="author" href="/home">' + author + '</a>' +
                '    </div>' +
                '</div>'
            );

            if (sort) {
                $("img[value='" + filename + "']").parent().parent().nextAll(".div-title").after(
                    '<div class="div-rank">' +
                    '<span class="rank">' + (i + 1 + worksShownum) + '</span>' +
                    '</div>'
                );
            }

            $(".div-img").width(width);
            $(".img").width(width);
            $(".img").height(width);

            $(".div-img").css("margin-right", "15px");
            $(".div-img").css("margin-bottom", "15px");

            if (i != result.length - 2) {
                i++;
                show(i, result, width, sort);
            } else {
                worksnum = result[result.length - 1].count;
                worksShownum += result.length - 1;
                if (worksnum == worksShownum) {
                    $(".loadmore").html("已经没有了哦");
                    $(".loadmore").off("click");
                }
                showcollections(result);
            }
        }
    }

    function showcollections(result) {
        var pageLikeList = "getCollections"
        $.get(
            pageLikeList,
            function(collectionsresult) {
                $(".like").off("click");
                if (collectionsresult == '未登录') {
                    $(".like").click(function() {
                        tip("要登录之后才能点红心哦");
                    });
                } else {
                    for (var i = 0; i <= result.length - 2; i++) {
                        var filename = result[i].filesname[sign[i]].name;
                        for (var k in collectionsresult.works) {
                            if (filename == collectionsresult.works[k].name) {
                                $("img[value='" + filename + "']").next().css("color", "rgba(255, 0, 0, 0.7)");
                            }
                        }
                    }
                    var pageLike = "like";
                    var like = 0;
                    $(".like").off("click");
                    $(".like").click(function() {
                        var num = parseInt($(this).next().html());
                        var dataname = $(this).prevAll("img").attr("value");
                        if ($(this).css("color") != "rgba(255, 0, 0, 0.7)") {
                            $(this).css("color", "rgba(255, 0, 0, 0.7)");
                            $(this).next().html(num + 1);
                            like = 1;
                            console.log(like);
                        } else {
                            $(this).css("color", "rgba(0, 0, 0, 0.1)");
                            $(this).next().html(num - 1);
                            like = -1;
                            console.log(like);
                        }
                        $.get(
                            pageLike, {
                                "name": dataname,
                                "like": like
                            },
                            function(result) {
                                console.log(result);
                            }
                        );
                    });
                }
            }
        );
    }

    function tip(text) {
        $("#ModalTip").fadeIn(1000);
        $("#ModalTip").text(text);
        setTimeout(function() {
            $("#ModalTip").fadeOut(1000);
        }, 3000);
    }
});