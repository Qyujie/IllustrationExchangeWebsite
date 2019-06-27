$(function() {
    var pageGet = "getAuthorAtlas";
    getworks(pageGet);

    function getworks(pageGet) {
        $.get(
            pageGet,
            function(worksresult) {
                var divWidth = window.innerWidth * 0.8;
                var width = (divWidth - 15 * 3 - 20 * 2) / 4;
                $("#div-collections").width(divWidth);
                if (worksresult != '未选择') {
                    var i = 0;
                    show(i, worksresult, width);
                }
            }
        );
    }

    function show(i, result, width) {
        var id = result[0].id;
        var date = result[0].date;
        var headPortraitsrc = '/uploads/users/' + id + '/head_portrait/' + result[0].head_portrait;
        var likenum = result[0].filesname[i].likenum;
        var filename = result[0].filesname[i].name
        var worksrc = '/uploads/users/' + id + '/upload_img/' + filename;
        var title = result[0].work_title;
        var author = result[0].name;
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

            $(".div-img").width(width);
            $(".img").width(width);
            $(".img").height(width);

            $(".div-img").css("margin-right", "15px");
            $(".div-img").css("margin-bottom", "15px");

            if (i != result[0].filesname.length - 1) {
                i++;
                show(i, result, width);
            } else {
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
                    console.log(collectionsresult);
                    for (var i = 0; i <= result[0].filesname.length - 1; i++) {
                        var filename = result[0].filesname[i].name;
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
                        } else {
                            $(this).css("color", "rgba(0, 0, 0, 0.1)");
                            $(this).next().html(num - 1);
                            like = -1;
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