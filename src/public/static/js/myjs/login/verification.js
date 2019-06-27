$(function() {
    $("#luser-value").keyup(function() {
        $("#lUserCheckResult").removeClass("glyphicon-remove");
        $("[data-toggle='lUserTip']").tooltip("destroy");

    });
});

$(function() {
    $("#lpassword-value").keyup(function() {
        $("#lPasswordCheckResult").removeClass("glyphicon-remove");
        $("[data-toggle='lPasswordTip']").tooltip("destroy");

    });
});

$(function() {
    $("#ruser-value").keyup(function() {
        var page = "checkName";
        $("[data-toggle='rUserTip']").tooltip("destroy");
        var value = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
        setTimeout(function() {
            if (value == "") {
                $("#rUserCheckResult").removeClass("glyphicon-remove");
                $("#rUserCheckResult").removeClass("glyphicon-ok");
                $("#rSubmit").attr('disabled', true);
            } else if (value.length > 15) {
                $("#rUserCheckResult").removeClass("glyphicon-ok");
                $("#rUserCheckResult").addClass("glyphicon-remove");
                $("#rUserCheckResult").css("color", "red");
                $("#rUserCheckResult").attr("title", "账号长度不能大于15字");
                $("[data-toggle='rUserTip']").tooltip("show");
                $("#rSubmit").attr('disabled', true);
            } else {
                $.get(
                    page, { "name": value },
                    function(result) {
                        if (result == "未注册") {
                            $("#rUserCheckResult").removeClass("glyphicon-remove");
                            $("#rUserCheckResult").addClass("glyphicon-ok");
                            $("#rUserCheckResult").css("color", "green");
                            $("#rUserCheckResult").attr("title", "");
                            $("[data-toggle='rUserTip']").tooltip("destroy");
                            $("#rSubmit").attr('disabled', false);
                        } else {
                            $("#rUserCheckResult").removeClass("glyphicon-ok");
                            $("#rUserCheckResult").addClass("glyphicon-remove");
                            $("#rUserCheckResult").css("color", "red");
                            $("#rUserCheckResult").attr("title", "已注册");
                            $("[data-toggle='rUserTip']").tooltip("show");
                            $("#rSubmit").attr('disabled', true);
                        }
                    }
                );
            }
        }, 300);
    });
});


$(function() {
    $("#rpassword-value").keyup(function() {
        var value = $(this).val();
        $("[data-toggle='rPasswordTip']").tooltip("destroy");
        //300毫秒后执行，因为如果立刻执行destroy会把后面show的提示也给销毁
        setTimeout(function() {
            if (value.length >= 6 && value.length <= 20) {
                $("#rPasswordCheckResult").removeClass("glyphicon-remove");
                $("#rPasswordCheckResult").addClass("glyphicon-ok");
                $("#rPasswordCheckResult").css("color", "green");
                $("#rPasswordCheckResult").attr("title", "");
                $("#rSubmit").attr('disabled', false);
            } else if ((value.length > 0 && value.length < 6) || value.length > 20) {
                $("#rPasswordCheckResult").removeClass("glyphicon-ok");
                $("#rPasswordCheckResult").addClass("glyphicon-remove");
                $("#rPasswordCheckResult").css("color", "red");
                if (value.length > 0 && value.length < 6) {
                    $("#rPasswordCheckResult").attr("title", "密码不能小于6位");
                } else {
                    $("#rPasswordCheckResult").attr("title", "密码不能大于20位");
                }
                $("[data-toggle='rPasswordTip']").tooltip("show");
                $("#rSubmit").attr('disabled', true);
            }
            //密码为空时
            else {
                $("#rPasswordCheckResult").removeClass("glyphicon-remove");
                $("#rPasswordCheckResult").removeClass("glyphicon-ok");
                $("#rSubmit").attr('disabled', true);
            }
        }, 300);

    });
});