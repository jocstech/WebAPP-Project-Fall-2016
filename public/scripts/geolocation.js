var API_KEY = 'AIzaSyAIlBjfSe_zlR0nIzFXUKjvY-cfy8Z3uBM';
var geoinfo;
var geocoder;

function geocode(pos) {
  geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': pos}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
          console.log('Current Location: '+results[0].formatted_address);
        geoinfo = results[0].formatted_address;
      } else {
        geoinfo = 'No results found';
      }
    } else {
      geoinfo = 'Geocoder failed due to: ' + status;
    }
  });
    return geoinfo;
}