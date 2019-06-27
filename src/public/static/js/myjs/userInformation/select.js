$(function(){
	var yearleap;//用于判断是否为闰年，是返回1，否返回0
	var monthleap;//用于判断大小月及是否为2月，大月返回3，小月返回4,2月返回5
	var daylast=4;//用于判断上一次操作之后select-day中option状态，1,2,3,4,分别为28,29,30,31
	
	var year = $("#select-year").val();
	var month = $("#select-month").val();
	if (year%4==0){if (year%100==0){if (year%400==0){yearleap=1;} //能被400整除的，是闰年
	   		else{yearleap=0;}} //能被100整除，但不能被400整除的，不是闰年
	   	else{yearleap=1;}} //能被4整除，但不能被100整除的，不是闰年
	else{yearleap=0;}//不能被4整除的，不是闰年
	if (month==4 || month==6 || month==9 || month==11){monthleap=4;	}
	else if(month==2){monthleap=5;}
	else{monthleap=3;}
	
	if(monthleap==4){//小月
		$("#select-day option[value='31']").remove();
		daylast=3;
	}
	if(monthleap==5){//2月
		$("#select-day option[value='31']").remove();
		$("#select-day option[value='30']").remove();
		daylast=2;
		if(yearleap==0){
			$("#select-day option[value='29']").remove();
			daylast=1;
		}
	}
	
	$("#select-year").change(function(){
		changeDay();
		});
	$("#select-month").change(function(){
		changeDay();
		});
	
	
	function changeDay(){
		if($("#select-day").val()!=""){$("#select-day").val("1");}
		
		var year = $("#select-year").val();
		var month = $("#select-month").val();
		if (year%4==0){if (year%100==0){if (year%400==0){yearleap=1;} //能被400整除的，是闰年
		   		else{yearleap=0;}} //能被100整除，但不能被400整除的，不是闰年
		   	else{yearleap=1;}} //能被4整除，但不能被100整除的，不是闰年
		else{yearleap=0;}//不能被4整除的，不是闰年
		if (month==4 || month==6 || month==9 || month==11){monthleap=4;	}
		else if(month==2){monthleap=5;}
		else{monthleap=3;}
		
		var $optionV29 = $('<option value="29">29</option>');
	    var $optionV30 = $('<option value="30">30</option>');
	    var $optionV31 = $('<option value="31">31</option>');
		if(monthleap==3){//大月
			if(daylast==1){
			    $("#select-day").append($optionV29,$optionV30,$optionV31);
			}
			if(daylast==2){
				$("#select-day").append($optionV30,$optionV31);
			}
			if(daylast==3){
				$("#select-day").append($optionV31);
			}
			daylast=4;
		}
		else if(monthleap==4){//小月
			if(daylast==1){
			    $("#select-day").append($optionV29,$optionV30);
			}
			if(daylast==2){
				$("#select-day").append($optionV30);
			}
			if(daylast==4){
				$("#select-day option[value='31']").remove();
			}
			daylast=3;
		}
		else if(monthleap==5){//2月
			if(daylast==1){
			    $("#select-day").append($optionV29);
			}
			if(daylast==3){
				$("#select-day option[value='30']").remove();
			}
			if(daylast==4){
				$("#select-day option[value='31']").remove();
				$("#select-day option[value='30']").remove();
			}
			daylast=2;
			if(yearleap==0){
				if(daylast==2){
					$("#select-day option[value='29']").remove();
				}
				if(daylast==3){
					$("#select-day option[value='29']").remove();
					$("#select-day option[value='30']").remove();
				}
				if(daylast==4){
					$("#select-day option[value='29']").remove();
					$("#select-day option[value='30']").remove();
					$("#select-day option[value='31']").remove();
				}
				$("#select-day option[value='29']").remove();
				daylast=1;
			}
		}
	}
	
	});