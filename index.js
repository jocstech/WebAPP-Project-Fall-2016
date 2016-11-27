var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require('path');


// Configuration

// Parsing POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
app.set('port', process.env.PORT || 3000);

// Static files
app.use(express.static('public'));


// Functions:

var preusername = 'jocstech';
var prepassword = 'jocstech';


// User authentication verification

function usernameAuth(username,password) {
    // TODO:
    if(username == preusername && password == prepassword)
        return true;
    else
        return false;
}


// Routes

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.post('/login', function(req, res) {
    var username = req.body.user;
    var password = req.body.pass;
    
    if(usernameAuth(username, password)) {
        res.sendFile(path.join(__dirname + '/public/home.html'),{username:username});
        //res.send(username);
        console.log(username + ' Login Good !!!');
    } else {
        console.log(username + ' Incorrect Username!!!');
    }
    
    
});


app.listen(app.get('port'));
console.log('Server running at http://127.0.0.1:3000/');