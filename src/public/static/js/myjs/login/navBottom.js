$(function(){
	   $(".div-dropup button").mouseenter(function(){
		   this.click();
		   $(this).css("background-color","rgba(0,0,0, 0.3)");
	   });
	});

$(function(){
	   $(".div-dropup button").mouseleave(function(){
		   this.click();
		   $(this).css("background-color","rgba(0,0,0, 0)");
	   });
	});

$(function(){
	$(".div-dropup ul").mouseenter(function(){
		$(this).prev().click();
		$(this).prev().css("background-color","rgba(0,0,0, 0.3)");
		});
	});

$(function(){
	$(".div-dropup ul").mouseleave(function(){
		$(this).prev().click();
		$(this).prev().css("background-color","rgba(0,0,0, 0)");
		});
	});