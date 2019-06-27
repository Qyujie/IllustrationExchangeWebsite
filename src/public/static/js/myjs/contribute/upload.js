$(function() {
    $("#div-headPortrait").click(function() {
        return $(".input-headPortrait").click();
    });

    var files = [];
    var index = 0;
    $(".input-headPortrait").bind("change", function() {
        var width = $("#div-upload").width();
        var margin = (width - 10 * 100 - 2) / 11;
        var inputfiles = $(".input-headPortrait")[0].files;
        var url = null;
        if (inputfiles.length <= 1) {
            files[index] = inputfiles[0];
            url = window.URL.createObjectURL(files[index]);
            $("#div-headPortrait").before('<div style="background-image:url(' + url + ')" class="uploadimg"></div>');
            index++;
        } else {
            var k = index;
            for (var i = 0; i < inputfiles.length; i++) {
                files[k + i] = inputfiles[i];
                url = window.URL.createObjectURL(files[index]);
                $("#div-headPortrait").before('<div style="background-image:url(' + url + ')" class="uploadimg"></div>');
                index++;
            }
        }

        $("#div-headPortrait").css("display", "inline-block");
        $(".uploadimg").css("margin-right", margin);
        $("#div-img").css("margin-left", margin);
        $("#div-headPortrait ").css("margin-right", margin);

        $(".uploadimg").off("click");
        $(".uploadimg").click(function() {
            var num = $(this).index();
            delete files[num];
            for (var i = 0; i < files.length; i++) {
                if (typeof files[i] == "undefined") {
                    for (var k = i; k < files.length; k++) {
                        files[k] = files[k + 1];
                    }
                    break;
                }
            }
            files.length--;
            index--;
            $(this).remove();
            if (index == 0) {
                $("#div-headPortrait").css("display", "block");
                $("#div-headPortrait ").css("margin-right", "auto");
            }
        });
    });

    Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }



    $("#submit").click(function() {
        var upload_date = new Date().Format("yyyy-MM-dd HH:mm:ss");
        var work_attribute = $("#workAttribute .icon-checked").attr("value");
        var work_classification = $("#workClassification .icon-checked").attr("value");
        var work_title = $("#workTitle input").val();
        var work_brief_introduction = $("#workBriefIntroduction textarea").val();
        if (index == 0) {
            tip("你还没有选择上传的作品哦");
        } else if (typeof work_attribute == "undefined") {
            tip("作品属性还没有选哦");
        } else if (typeof work_classification == "undefined") {
            tip("作品分类还没有选哦");
        } else {
            var page1 = "uploadImg";
            var page2 = "uploadImgInformation";
            var formData = new FormData();
            for (var i = 0; i < index; i++) {
                formData.append('files', files[i]);
            }
            formData.append("upload_date", upload_date);
            formData.append("work_attribute", work_attribute);
            formData.append("work_classification", work_classification);
            formData.append("work_title", work_title);
            formData.append("work_brief_introduction", work_brief_introduction);
            $.ajax({
                url: page1,
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function(result) {
                    if (result == "Success") {
                        tip("发布成功");
                        window.location.href = "home";
                    }
                }
            });
        }
    });

    function tip(text) {
        $("#ModalTip").fadeIn(1000);
        $("#ModalTip").text(text);
        setTimeout(function() {
            $("#ModalTip").fadeOut(1000);
        }, 3000);
    }

});