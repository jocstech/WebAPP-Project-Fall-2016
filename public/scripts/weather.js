var APIKey = "e441ce418c16dd855a0671396afed15f";

var map;
var userLat;
var userLng;
var forecast = {};
var msg;

$(document).ready(function () {

    userLat=43.9454;
    userLng=-78.8964;
    updateInfo();
    //drawAreaChart();
        
});

// Update the data
function updateInfo(){
    // downloadWeather
        downloadWeather();
        // downloadForecast event
        downloadForecast();
}

// ajax get JSON
function downloadWeather () {
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + userLat + '&lon=' + userLng + '&units=metric&APPID=' + APIKey;
    $.getJSON(url,function(data){
        //$("#goButton").after("&nbsp;&nbsp;&nbsp;City: "+ data.name);
        $("#cityname").html(data.name+','+data.sys.country);
        $("#weatherIcon").html('<img src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png">');
        $("#currentTemp").html("Current: "+data.main.temp+"&#8451;");
        $("#lowTemp").html("Low: "+data.main.temp_min+"&#8451;");
        $("#hightTemp").html("High: "+data.main.temp_max+"&#8451;");
        $("#outlook").html(data.weather[0].description);
        $("#direction").html("Direction: "+data.wind.deg+"&deg;");
        $("#speed").html("Speed: "+data.wind.speed+"m/s");
        $("#pressure").html("Pressure: "+data.main.pressure+"mB");
        $("#humidity").html("Humidity: "+data.main.humidity+"%");
        $("#cloudsall").html("Cloudiness: "+data.clouds.all+"%");
        $("#sea_level").html("Sea Level: "+data.main.sea_level+"hPa");
        $("#grnd_level").html("Ground Level: "+data.main.grnd_level+"hPa");
        $("#sunrise").html("Sunrise: "+new Date( data.sys.sunrise *1000).toString());
        $("#sunset").html("Sunset:" +new Date( data.sys.sunset *1000).toString());
    });
}

// ajax get XML 
function downloadForecast(){
    var xml = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ userLat+ '&lon=' + userLng + '&mode=xml&units=metric&cnt=10&APPID=' + APIKey;
    
    $("#table tr").slice( 1 , 11 ).remove();
    
    $.ajax({
        type: 'POST' ,
        url: xml ,
        async:false ,
        dataType:"xml" ,
        success: function(docxml){
            var root = $(docxml);
            var msg = root.find('name').text(); // node value
            
            root.find('time').each(function(){
                var element = $(this);
                var date = element.attr("day"); // node attr
                var symbol = element.children("symbol").attr("number"); // symbol
                var high = element.children("temperature").attr("max"); // high temp
                var low = element.children("temperature").attr("min"); // low temp
                var wind = element.children("windSpeed").attr("name"); // wind type
                var clouds = element.children("clouds").attr("value"); // cloud conditon
                
                $("table tr:last").after(TableRow([date,symbol,high,low,wind,clouds]));
            });
            
        }});
    }

function TableRow(trs){
    var htm = "<tr>"; 
    for(var i = 0; i < trs.length; i++){
        if(i==1){
            htm +='<td><img class="symbol" src="assets/weathers/'+trs[1]+'.png" alt="'+trs[1]+'"></td>';
        } else {
            htm +="<td>" + trs[i] + "</td>";
        }
    }
    htm += "</tr>";
    return htm;
}

function drawAreaChart() {
//http://api.openweathermap.org/data/2.5/forecast/daily?lat=43.9454&lon=-78.8964&mode=json&units=metric&cnt=16&APPID=e441ce418c16dd855a0671396afed15f
    
var jsonUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ userLat+ '&lon=' + userLng + '&mode=json&units=metric&cnt=10&APPID=' + APIKey;
    
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json(jsonUrl, function(error, json) {
  
    if (error) throw error;
    
    x.domain(data.map(function(d) { return d.list[0].dt; }));
    y.domain([0, d3.max(data, function(d) { return d.list[0].temp.day; })]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); });
});
    
}