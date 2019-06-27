$(function() {
    var pageGet = "getCollections";
    getworks(pageGet);

    function getworks(pageGet) {
        $.get(
            pageGet,
            function(worksresult) {
                console.log(worksresult);
                var divWidth = window.innerWidth * 0.8;
                var width = (divWidth - 15 * 3 - 20 * 2) / 4;
                $("#div-collections").width(divWidth);
                if (worksresult.length != 1) {
                    var i = 0;
                    show(i, worksresult, width);
                }
            }
        );
    }

    function show(i, result, width) {
        var id = result.works[i].id;
        var date = result.works[i].date;
        var headPortraitsrc = '/uploads/users/' + id + '/head_portrait/' + result.works[i].head_portrait;
        var filename = result.works[i].name
        var worksrc = '/uploads/users/' + id + '/upload_img/' + filename;
        var title = result.works[i].title;
        var author = result.works[i].name;

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
            $("img[value='" + filename + "']").next().css("color", "rgba(255, 0, 0, 0.7)");
            if (i != result.works.length - 1) {
                i++;
                show(i, result, width);
            } else {
                showcollections(result);
            }
        }
    }

    function showcollections(result) {
        $(".like").off("click");
        var pageLike = "like";
        $(".like").click(function() {
            var dataname = $(this).prevAll("img").attr("value");
            if ($(this).css("color") != "rgba(255, 0, 0, 0.7)") {
                $(this).css("color", "rgba(255, 0, 0, 0.7)");
                like = 1;
            } else {
                $(this).css("color", "rgba(0, 0, 0, 0.1)");
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


    function tip(text) {
        $("#ModalTip").fadeIn(1000);
        $("#ModalTip").text(text);
        setTimeout(function() {
            $("#ModalTip").fadeOut(1000);
        }, 3000);
    }
});