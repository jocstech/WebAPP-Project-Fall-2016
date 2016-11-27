$(document).ready(function () {
   
    // effects 
    addEffct($('.appicon'));
    
});


function addEffct(obj) {
    $(obj).click(function(){
        $(this).effect( "bounce", "slow" );
    });
}



