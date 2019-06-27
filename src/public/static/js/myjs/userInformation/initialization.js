$(function() {

    var pageGet = "getUserInformation";
    $.get(
        pageGet,
        function(result) {
            if (result != "null") { //已登录  
                //name
                $("#userinformation-name").val(result.name);

                //birthday
                //year
                //第0个value为“年”，第1个value为2018，2->2017，规律：第i个加上它的value等于2019
                var birthdayYear = result.birthdayYear;
                if (birthdayYear == "") {
                    $("#select-year option:eq(0)").attr("selected", "selected");
                } else {
                    birthdayYear = parseInt($("#select-year option:eq(1)").attr("value")) + 1 - birthdayYear
                    $("#select-year option:eq('" + birthdayYear + "')").attr("selected", "selected");
                }
                //month
                var birthdayMonth = result.birthdayMonth;
                if (birthdayMonth == "") {
                    $("#select-month option:eq(0)").attr("selected", "selected");
                } else {
                    $("#select-month option:eq('" + birthdayMonth + "')").attr("selected", "selected");
                }

                //day
                var birthdayDay = result.birthdayDay;
                if (birthdayDay == "") {
                    $("#select-day option:eq(0)").attr("selected", "selected");
                } else {
                    $("#select-day option:eq('" + birthdayDay + "')").attr("selected", "selected");
                }

                //sex
                var sex = result.sex;
                if (sex == "男") {
                    $("#userinformation-sex option:eq(1)").attr("selected", "selected");
                } else if (sex == "女") {
                    $("#userinformation-sex option:eq(2)").attr("selected", "selected");
                } else {
                    $("#userinformation-sex option:eq(0)").attr("selected", "selected");
                }

                //phone
                $("#userinformation-phone").val(result.phone);

                //prefecture
                var prefecture = result.prefecture;
                if (prefecture == "1") {
                    $("#userinformation-prefecture option:eq(1)").attr("selected", "selected");
                } else if (prefecture == "2") {
                    $("#userinformation-prefecture option:eq(2)").attr("selected", "selected");
                } else {
                    $("#userinformation-prefecture option:eq(0)").attr("selected", "selected");
                }

                //introduce
                var introduce = result.introduce;
                if (introduce == null) {
                    introduce = "";
                }
                $("#userinformation-introduce").text(introduce);

                //headPortrait
                if (result.head_portrait != null) {
                    $('#div-headPortrait').css("background-image", "url(/uploads/users/" + result.id + "/head_portrait/" + result.head_portrait + ")");
                }

                //address
                $("#userinformation-address").val(result.address);

                //realName
                $("#userinformation-real_name").val(result.real_name);

                //idCard
                $("#userinformation-id_card").val(result.id_card);
            }
        }
    );
});