$(document).ready(function(){
    
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
       setGreeting('Good morning,&nbsp;');
    }
    else if (curHr < 18) {
        setGreeting('Good afternoon,&nbsp;');
    }
    else {
        setGreeting('Good evening,&nbsp;');
    }
    setCurrentTime();
    
    // logining control:
    $( ".button-sign-in" ).click(function() {
        setTimeout(
            function(){$('#msg').addClass('bg-danger').html('Wrong username or password');},100);
        
    });
    $('#login .button-rememember-me').click(function(e) {
		var span = $(this).find('span');
		if (span.hasClass('glyphicon-unchecked')){
			span.addClass('glyphicon-ok');
			span.removeClass('glyphicon-unchecked');
		}	else{
			span.removeClass('glyphicon-ok');
			span.addClass('glyphicon-unchecked');
		}
	});
});


// Go back to previous page
function goBack() {
    window.history.back();
}

function setGreeting(text) {
    $('#greeting').html(text);
}


function setCurrentTime() {
    $('#currentTime').html(getDateTime());
    setTimeout(setCurrentTime, 1000);
}

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = 'Time: '+year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}


function sendNotification(text){
    $("#notification").fadeIn("slow");
     $("#notification").html(text);
    
    setTimeout(function(){
        $("#notification").fadeOut("slow");
    },6000);
}


