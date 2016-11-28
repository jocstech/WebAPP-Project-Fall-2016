// The main javascript for the foodwheel

var canvas;
var countries;
var conuntryRes='';


$(document).ready(function () {
    // Loading create wheel class for drawing the wheel
    $.getScript('scripts/createwheel.js',function(){
        countries = ["Canadian", "American", "Chinese", "Thai", "Japanese","Greek", "Russian", "Arabic", "Persian", "Mexican"];
         canvas = $('#wheel_canvas').get(0);
        createWheel(canvas,countries);
    });
    
    var id = setInterval(function(){
        conuntryRes = $('#wheelresult').text();
        if(conuntryRes!=''){
            setTimeout(setVarietyWheel(conuntryRes),15000);
            clearInterval(id);
        }
    },10000);
});

function setVarietyWheel(conuntryRes){
    $('#msg').text('Setp 2: Let\'s Choose Variety.');
    canvas = $('#wheel_canvas').get(0);
    createWheel(canvas,getVarietyList(conuntryRes));
}


function getVarietyList(country) {
    switch(country){
        case 'Canadian':
            return ['Ketchup Chips','Maple Syrup','Bacon','Butter Tarts','BeaverTail','Nanaimo Bars','Game Meat','Wild Blueberries'];
            break;
        case 'American':
            return ['Cheeseburger','Reuben sandwich','Hot dogs','Philly cheese steak','Nachos','Chicago-style pizza','Delmonico’s steak','Blueberry cobbler','Green chili stew','Chocolate-chip cookies'];
            break;
        case 'Chinese':
            return ['Sweet and Sour Pork','Kung Pao Chicken','Spring Rolls','Egg-Fried Rice','Spicy Tofu','Dumplings','Won Ton Soup','Peking Roasted Duck','Chow Mein','Fried Shrimps'];
            break;
        case 'Thai':
            return ['Spicy Shrimp Soup','Spicy Green Papaya Salad','Chicken in Coconut Soup','Red Curr','Pad Thai'];
            break;
        case 'Japanese':
            return ['Sushi','Ramen','Unagi','Tempura','Kaiseki','Soba','Shabu-Shabu','Okonomiyaki','Tonkatsu','Yakitori'];
            break;
        case 'Greek':
            return ['Taramasalata','Olives & olive oil','Dolmades','Moussaka','Grilled meat','Fresh fish','Courgette balls','Octopus','Feta & cheeses','Honey & baklava'];
            break;
        case 'Russian':
            return ['Borsch','Russian pancakes','Russian salad',' Smoked salmon','Shashlik','Russian dumplings','Mini-pies','Honeycake','Stroganoff','Mushroom julienne'];
            break;
        case 'Arabic':
            return ['Hummus','Manakeesh','Grilled halloumi','Foul meddamas','Falafel','Tabouleh','Moutabal','Fattoush','Umm Ali','Shanklish'];
            break;
        case 'Persian':
            return ['Fesenjan','Bademjan','Baghali Polo','Zereshk Polo','Gormeh Sabzi','Ash e Reshteh','Tahdig','Jeweled Rice',' Kebab','Sabzi Khordan'];
            break;
        case 'Mexican':
            return ['Chilaquiles','Pozole','Tacos','Tostadas','Chiles en nogada','Elote','Enchiladas','Mole','Guacamole','Tamales'];
            break;
        default:
            return ["Burger", "Sushi", "Chow Mein", "Steak", "Chicken Parmesan", "Hot Dog", "Pizza", "Rice", "Kebab", "Spaghetti meatballs"];
            break;
    }
}