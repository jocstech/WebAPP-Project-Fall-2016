//Google Places API Key:AIzaSyAeG873-pvzUpuf4aYvgz15D3iLahTRe0Y
var map;
var marker;
var infowindow;
var geocoder;
var currentLoc;
var count;

$(document).ready(function() {
    
    
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAeG873-pvzUpuf4aYvgz15D3iLahTRe0Y&libraries=places&callback=initMap');
    
    setTimeout(function(){$("#loadinganimation").hide();},3000);
    
    //makeAnimation();
    

});


function makeAnimation(){
    count = 4;
    var id = setInterval(function(){
        map = new google.maps.Map($('#map').get(0), {
          center: currentLoc,
          zoom: count
        });
        count++;
        if(count>16){
            clearInterval(id);
            
            drawCircle(currentLoc,1000);
            
            new google.maps.Marker({
                  map: map,
                  label: 'HOME',
                  draggable: false,
                  animation: google.maps.Animation.DROP,
                  position: currentLoc,
                  icon: {
                      url:'http://media.spotonsuccess.tv/wp-content/uploads/2012/06/Man-Thinking-01.png?d3dc63',
                      anchor: new google.maps.Point(40,80),
                      scaledSize: new google.maps.Size(80, 80)
                  }
              });
            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
              service.nearbySearch({
                  location: currentLoc,
                  radius: 1000,
                  type: ['food']
              }, processResults);
        }
    },1000);
}    

function initMap() {
    
    geocoder = new google.maps.Geocoder;
    
    marker = new google.maps.Marker({
                  map: map,
                  draggable: false,
                  animation: google.maps.Animation.DROP,
                  position: currentLoc
              });
    
    
     var map = new google.maps.Map($('#map').get(0), {
          center: {lat:43.9454,lng:-78.8964},
          zoom: 4
        });
    

        $(marker).click(toggleBounce());
    
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            currentLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
              
              // when location detected here:
              makeAnimation();
              
              
              
          }, function() {
              sentMsg('Location Disabled!');
          });
        } else {
          // Browser doesn't support Geolocation
          sentMsg('Browser doesn\'t support Geolocation');
        }     
}

function sentMsg(text) {
    $('#apptitle').text(text);
}

// get current location
function getCurrentLocation() {
    // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            currentLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          }, function() {
          });
        } else {
          // Browser doesn't support Geolocation
        }
}

// a effect toggle
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


// draw a circle to indicate the range
function drawCircle(cen,rad) {
     var cityCircle = new google.maps.Circle({
      strokeColor: '#00FF00',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.01,
      map: map,
      center: cen,
      radius: rad
    });
}

// process each result back from server.
function processResults(results, status, pagination) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    createMarkers(results);

    if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = false;

      moreButton.addEventListener('click', function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
  }
}


// Create the result marker on map.
function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });
      
      var open;
      var color;
      
      if(place.opening_hours!=null){
        open='<span class="pull-right" style="color:green;">Open Now<span>';
          color='#00FF00';
      } else {
        open='<span class="pull-right" style="color:red;">Closed<span>';
          color='#FF0000';
      }
      
      var placeLoc = {
          lat:place.geometry.location.lat(),
          lng:place.geometry.location.lng()};
      
      var dist = Math.floor(getDistance(currentLoc,placeLoc));
      
      var path = [currentLoc,placeLoc];
      
      var flightPath = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: color,
          strokeOpacity: 1.0,
          strokeWeight: 1
        });

        flightPath.setMap(map);
      
    if(place.url!=null){
        placesList.innerHTML += '<li><img width="15px" src="'+place.icon+'"/><a href="'+place.url+'"><b>'+ place.name +'</b></a><br>Distance:'+ dist +'m'+ open + '</li>';
    } else {
        placesList.innerHTML += '<li><img width="15px" src="'+place.icon+'"/><b>'+ place.name +'</b><br>Distance:'+ dist +'m'+ open + '</li>';
    }
    
      
    google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      
    bounds.extend(place.geometry.location);
      
       
  }
  map.fitBounds(bounds);
    
    
}


var rad = function(x) {
  return x * Math.PI / 180;
}

// Haversine formula
var getDistance = function(p1, p2) {
  var R = 6378137;
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;
  return distance; //meter
}



function getNightModeStyle() {
    
return [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ];
}