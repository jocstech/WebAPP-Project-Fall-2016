var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


//app.use(bodyParser.urlencoded({ extended: true })); 

// server port
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static('public'));

// Routes

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.post('/login', function(req, res) {
    console.log("Logined !!!");
});


app.listen(app.get('port'));
console.log('Server running at http://127.0.0.1:3000/');