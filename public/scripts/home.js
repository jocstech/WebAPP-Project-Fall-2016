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



