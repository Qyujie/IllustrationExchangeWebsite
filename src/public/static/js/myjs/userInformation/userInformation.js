$(function() {
    $("#uISubmit").click(function() {
        var page = "addUserInformation";
        var namevalue = $("#userinformation-name").val().replace(/\s*/g, "");
        var sexvalue = $("#userinformation-sex").val();
        var phonevalue = $("#userinformation-phone").val().replace(/\s*/g, "");
        var prefecturevalue = $("#userinformation-prefecture").val();
        var introducevalue = $("#userinformation-introduce").val();
        var addressvalue = $("#userinformation-address").val();
        var real_namevalue = $("#userinformation-real_name").val();
        var id_cardvalue = $("#userinformation-id_card").val().replace(/\s*/g, "");

        //处理生日，将年月日合并,且格式为yyyy-mm-dd
        var yearvalue = $("#select-year").val();
        var monthvalue = $("#select-month").val();
        var dayvalue = $("#select-day").val();
        var birthdayvalue = yearvalue + "-" + monthvalue + "-" + dayvalue;
        //处理性别，如果没选择则为空
        if (sexvalue == "请选择") sexvalue = "";

        //处理所在地区，如果没选择则为空
        if (prefecturevalue == "请选择") prefecturevalue = "";
        /*alert("");*/

        var rp = /^\d{11}$/; //11位数字
        var rx = /^\d{17}$/; //17位数字,末尾为x
        var ri = /^\d{18}$/; //18位数字
        if (!rp.test(phonevalue)) {
            tip("请输入正确的号码");
        } else if (introducevalue.length > 255) {
            tip("简介不能超过255个字");
        } else if (addressvalue.length > 50) {
            tip("住址不能超过50个字");
        } else if (real_namevalue.length > 15) {
            tip("请输入正确的姓名");
        } else if (!ri.test(id_cardvalue) &&
            (!rx.test(id_cardvalue.substr(0, id_cardvalue.length - 1)) &&
                (id_cardvalue.charAt(id_cardvalue.length - 1) != "x" ||
                    id_cardvalue.charAt(id_cardvalue.length - 1) != "X"))) {
            tip("请输入正确的身份证号");
        } else {
            $.post(
                page, {
                    "name": namevalue,
                    "birthday": birthdayvalue,
                    "sex": sexvalue,
                    "phone": phonevalue,
                    "prefecture": prefecturevalue,
                    "introduce": introducevalue,
                    "address": addressvalue,
                    "real_name": real_namevalue,
                    "id_card": id_cardvalue,
                },
                function(result) {
                    if (result == "修改成功") {
                        tip("修改成功");
                    } else {
                        tip("该账号已被其他人注册");

                    }
                }
            );
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