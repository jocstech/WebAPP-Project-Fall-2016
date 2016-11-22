$(document).ready(function () {
  var lock = false;
  var isStopped = false;
  var started = false;
  var speed = 0;
  var slowDownRand = 0;


  $(function anim() {

    if(started){
      deg += speed;
      deg %= 360;
    }

    // Increment speed
    if(!isStopped && speed<3){
      speed = speed+20 * 0.1;
    }
    // Decrement Speed
    if(isStopped){
      if(!lock){
        lock = true;
        slowDownRand = rand(0.994, 0.998);
      }
      speed = speed>0.2 ? speed*=slowDownRand : 0;
    }
    // Stopped!
    if(lock && !speed){
      var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg);
      ai = (slices+ai)%slices;
      $('#result').html("Your choice: " + country[ai]);

    }
    
    $('#countryWheel').html(drawCountryWheel());
    window.requestAnimationFrame( anim );

  });

  $('#startSpin').bind('click', function() {
    started = true;
  });

  $('#stopSpin').bind('click', function() {
    isStopped = true;
  });
});
