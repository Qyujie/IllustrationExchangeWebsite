$(function() {
    $("#tbox").click(function() {
        $("#tbox").addClass("icon-checked");
        $("#tbox").removeClass("icon-unchecked");
        $("#ybox").addClass("icon-unchecked");
        $("#ybox").removeClass("icon-checked");
    });

    $("#ybox").click(function() {
        $("#ybox").addClass("icon-checked");
        $("#ybox").removeClass("icon-unchecked");
        $("#tbox").addClass("icon-unchecked");
        $("#tbox").removeClass("icon-checked");
    });

    $("#mbox").click(function() {
        $("#mbox").addClass("icon-checked");
        $("#mbox").removeClass("icon-unchecked");
        $("#cbox").addClass("icon-unchecked");
        $("#cbox").removeClass("icon-checked");
        $("#qbox").addClass("icon-unchecked");
        $("#qbox").removeClass("icon-checked");
    });
    $("#cbox").click(function() {
        $("#cbox").addClass("icon-checked");
        $("#cbox").removeClass("icon-unchecked");
        $("#mbox").addClass("icon-unchecked");
        $("#mbox").removeClass("icon-checked");
        $("#qbox").addClass("icon-unchecked");
        $("#qbox").removeClass("icon-checked");
    });
    $("#qbox").click(function() {
        $("#qbox").addClass("icon-checked");
        $("#qbox").removeClass("icon-unchecked");
        $("#cbox").addClass("icon-unchecked");
        $("#cbox").removeClass("icon-checked");
        $("#mbox").addClass("icon-unchecked");
        $("#mbox").removeClass("icon-checked");
    });

});