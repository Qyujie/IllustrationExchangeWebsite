$(function() {
    $("#lRegist").click(function() {
        $("[data-toggle='lUserTip']").tooltip("destroy");
        $("[data-toggle='lPasswordTip']").tooltip("destroy");
        $("#lUserCheckResult").removeClass("glyphicon-remove");
        $("#lPasswordCheckResult").removeClass("glyphicon-remove");
        $("input").val("");
    });
});

$(function() {
    $("#rSubmit").click(function() {
        var page = "addUser";
        var uservalue = $("#ruser-value").val().replace(/\s*/g, "");
        var passwordvalue = $("#rpassword-value").val();
        $.post(
            page, {
                "name": uservalue,
                "password": passwordvalue
            },
            function(result) {
                if (result == "已注册") {
                    $("#rUserCheckResult").removeClass("glyphicon-ok");
                    $("#rUserCheckResult").addClass("glyphicon-remove");
                    $("#rUserCheckResult").css("color", "red");
                    $("#rUserCheckResult").attr("title", "已注册");
                    $("[data-toggle='rUserTip']").tooltip("show");
                    $("#rSubmit").attr('disabled', true);
                } else {
                    $("#myModal").modal("hide");
                    $("input").val("");
                    $("#rUserCheckResult").removeClass("glyphicon-ok");
                    $("#rPasswordCheckResult").removeClass("glyphicon-ok");
                    $("#luser-value").val(uservalue);
                }
            }
        );
    });
});