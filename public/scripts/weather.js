var APIKey = "e441ce418c16dd855a0671396afed15f";

var map;
var userLat;
var userLng;
var forecast = {};
var msg;
var conut;

$(document).ready(function () {
    
    // initialized location: will change later.
    userLat=43.9454;
    userLng=-78.8964;
    
    updateInfo();
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var currentLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
              
              userLat = currentLoc.lat;
              userLng = currentLoc.lng;
              
              updateInfo();
              
          }, function() {
              sendNotification('Location Disabled!');
          });
        } else {
          // Browser doesn't support Geolocation
          sendNotification('Browser doesn\'t support Geolocation');
    }  
    
    
    
        
});

// Update the data
function updateInfo(){
    // downloadWeather
    downloadWeather();
    // downloadForecast event
    downloadForecast();
    // drawing the 16 days forecast trend chart.
    drawAreaChart();
}

// ajax get JSON
function downloadWeather () {
    var jsonURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + userLat + '&lon=' + userLng + '&units=metric&APPID=' + APIKey;
    $.getJSON(jsonURL,function(data){
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
        $("#sunrise").html("Sunrise: "+new Date( data.sys.sunrise *1000).toString());
        $("#sunset").html("Sunset:" +new Date( data.sys.sunset *1000).toString());
    });
}


// ajax get XML 
function downloadForecast(){
    var xmlURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ userLat+ '&lon=' + userLng + '&mode=xml&units=metric&cnt=10&APPID=' + APIKey;
    
    $("#table tr").slice( 1 , 11 ).remove();
    
    $.ajax({
        type: 'POST' ,
        url: xmlURL ,
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

// helper: table tow creator
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

// ajax get XML data from openweathermap, and put them into a 2 variable list.
function downloadForecastForD3(){
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ userLat+ '&lon=' + userLng + '&mode=xml&units=metric&cnt=16&APPID=' + APIKey;
    var list=[];

    
    $.ajax({
        type: 'POST' ,
        url: url ,
        async: false ,
        dataType: "xml" ,
        success: function(docxml){
            count = 0;
            var root = $(docxml);
            var msg = root.find('name').text(); // node value
            root.find('time').each(function(){
                var element = $(this);
                var date = element.attr("day"); // node attr
                var high = element.children("temperature").attr("max"); // high temp
                var low = element.children("temperature").attr("min"); // low temp
                var avgTemp = (parseFloat(high)+parseFloat(low))/2; // avarage temp
                avgTemp = Math.round(avgTemp * 100) / 100
                //console.log({date:date,temp:avgTemp});
                list[count++]={date:date,temp:avgTemp};
            });
        }});
    return list;
    }





// D3.js - Data-Driven Documents
function drawAreaChart() {

    var list = downloadForecastForD3();
    
d3.select(".chart").selectAll("h4").text("16 Days Weather Forecasts Average Temp Chart");    
    
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Temperature:</strong> <span style='color:red'>" + d.temp + "&#8451;</span>";
});

    
var svg = d3.select("#trend"),
    padding = {top: 20, right: 20, bottom: 50, left: 40},
    width = +svg.attr("width") - padding.left - padding.right,
    height = +svg.attr("height") - padding.top - padding.bottom;
    
    // X,Y Scale
    
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);


    
var g = svg.append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

    x.domain(list.map(function(d) { return d.date; }));
    y.domain([d3.min(list,function(d){return d.temp;})-2, d3.max(list, function(d) { return d.temp; })+2]);


    // drawing X-axis
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call( d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");
    

    // drawing Y-axis
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(20, "s"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Temperature;");

    g.selectAll(".bar")
    .data(list)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.date); })
      .attr("y", function(d) { return y(d.temp); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return 0; })
        .on('mouseover',tip.show)
        .on('mouseout',tip.hide)
        .transition()
        .delay(function(d, i) { return i * 200; })
		.duration(1000)
        .attr("height", function(d) { return height - y(d.temp); })
        

    svg.call(tip);
        // Center zero degree line
    svg.append("line")
        .attr("stroke-dasharray","1,1")
        .attr("x1", 34)
        .attr("y1", height/2+38.5)
        .attr("x2", width+38.5)
        .attr("y2", height/2+38)
        .attr("stroke-width", 0.9)
        .attr("stroke", "red");
    
}