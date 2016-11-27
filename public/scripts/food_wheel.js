// The main javascript for the foodwheel

var canvas;


$(document).ready(function () {
    // Loading create wheel class for drawing the wheel
    $.getScript('scripts/create_wheel.js',function(){
        var food_list = ["Burger", "Sushi", "Chow Mein", "Steak", "Chicken Parmesan",
                    "Hot Dog", "Pizza", "Rice", "Kebab", "Spaghetti meatball"];
         canvas = $('#wheel_canvas').get(0);
        createWheel(canvas,food_list);
    });
    

});