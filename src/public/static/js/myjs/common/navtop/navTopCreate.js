$(function() {
    var $topNav = $('<div id="topNav"></div>');
    $("body").prepend($topNav);
    $("#topNav").load("static/common/navtop.html");
});