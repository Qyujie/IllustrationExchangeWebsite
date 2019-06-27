$(function() {
    $("#lSubmit").click(function() {
        var page = "verificationUser";
        var uservalue = $("#luser-value").val().replace(/(^\s*)|(\s*$)/g, "");
        var passwordvalue = $("#lpassword-value").val();
        $.post(
            page, {
                "name": uservalue,
                "password": passwordvalue
            },
            function(result) {
                if (result == "未注册") {
                    $("#lUserCheckResult").addClass("glyphicon-remove");
                    $("#lUserCheckResult").css("color", "red");
                    $("#lUserCheckResult").attr("title", "未注册");
                    $("[data-toggle='lUserTip']").tooltip("show");
                } else if (result == "密码错误") {
                    $("#lPasswordCheckResult").addClass("glyphicon-remove");
                    $("#lPasswordCheckResult").css("color", "red");
                    $("#lPasswordCheckResult").attr("title", "密码错误");
                    $("[data-toggle='lPasswordTip']").tooltip("show");
                } else {
                    window.location.href = "userInformation";
                }
            }
        );
    });
});