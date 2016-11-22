function rand(min, max){
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 3; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomCountry()  {
  var countries = ["Canadian", "American", "Chinese", "Thai", "Japanese",
                    "Greek", "Russian", "Arabic", "Persian", "Mexican"];
  var country = countries[Math.floor(Math.random() * 10)];
  return country;

}

function getRandomFood(){
  var variety = ["Burger", "Sushi", "Chow Mein", "Steak", "Chicken Parmesan",
                    "Hot Dog", "Pizza", "Rice", "Kebab", "Spaghetti meatballs"];
  var food = variety[Math.floor(Math.random() * 10)];
  return food;
}

var colour = [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(),
              getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()];
              
var country = [getRandomCountry(), getRandomCountry(), getRandomCountry(), getRandomCountry(),
              getRandomCountry(), getRandomCountry(), getRandomCountry(), getRandomCountry()];

var foodChoices = [getRandomFood(), getRandomFood(), getRandomFood(), getRandomFood(),
                    getRandomFood(), getRandomFood(), getRandomFood(), getRandomFood()];

var slices = colour.length;
var sliceDeg = 360/slices;
var deg = rand(0, 360);
var ctx = canvas.getContext('2d');
var width = canvas.width;
var center = width/2;

function deg_to_rad(deg) {
  return deg * Math.PI/180;
}

function drawSlice(deg, colour) {
  ctx.beginPath();
  ctx.fillStyle = colour;
  ctx.moveTo(center, center);
  ctx.arc(center, center, width/2, deg_to_rad(deg), deg_to_rad(deg+sliceDeg));
  ctx.lineTo(center, center);
  ctx.fill();
}

function drawText(deg, text) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(deg_to_rad(deg));
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(text, 130, 10);
  ctx.restore();
}

function drawCountryWheel() {
  ctx.clearRect(0, 0, width, width);
  for(var i=0; i<slices; i++){
    drawSlice(deg, colour[i]);
    drawText(deg+sliceDeg/2, country[i]);
    deg += sliceDeg;
  }
}

function drawFoodWheel() {
  ctx.clearRect(0, 0, width, width);
  for(var i=0; i<slices; i++){
    drawSlice(deg, colour[i]);
    drawText(deg+sliceDeg/2, foodChoices[i]);
    deg += sliceDeg;
  }
}
