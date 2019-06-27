$(function() {
    $("#title-input").bind('input propertychange', function() {
        $("#titleNum").html($.trim(this.value).length + "/20");
    });
    $("#intro-input").bind('input propertychange', function() {
        $("#introNum").html($.trim(this.value).length + "/233");
    });
});