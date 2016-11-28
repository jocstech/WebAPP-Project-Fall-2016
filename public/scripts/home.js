$(document).ready(function () {
   
    // effects 
    addEffct($('.appicon'));
    
    $("#systemicon").click(function(){
        sendNotification("System Function is Under Construction! See You Later.");
    });
    
});


function addEffct(obj) {
    $(obj).click(function(){
        $(this).effect( "bounce", "slow" );
    });
}

function sendNotification(text){
    $("#notification").fadeIn("slow");
     $("#notification").html(text);
    
    setTimeout(function(){
        $("#notification").fadeOut("slow");
    },6000);
}



