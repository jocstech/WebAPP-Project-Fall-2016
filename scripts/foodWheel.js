$(document).ready(function () {
    $.getScript('scripts/createWheel.js',function(){
        var food_list = ["Burger", "Sushi", "Chow Mein", "Steak", "Chicken Parmesan",
                    "Hot Dog", "Pizza", "Rice", "Kebab", "Spaghetti meatball"];
        createWheel(food_list);
    });
    
    

});