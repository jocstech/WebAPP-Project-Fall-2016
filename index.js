var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require('path');
var mongoose = require('mongoose');


// Configuration

// Parsing POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Static files
app.use(express.static('public'));


// Database-related

mongoose.connect('localhost:27017/foodwheel');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String, 
              unique: true,
              index: true},
	password: String
}, {collection: 'users'});
var User = mongoose.model('user', userSchema);

// demo account:
var preusername = 'jocstech';
var prepassword = 'jocstech';


// predefined database data // if you are using mongoDB client enter data, plz delete fellowing.
var newUser1 = new User({username: preusername ,password: prepassword});
var newUser2 = new User({username: 'bsmith' ,password: 'password'});
var newUser3 = new User({username: 'rfortier' ,password: 'password'});

newUser1.save();
newUser2.save();
newUser3.save();

// Functions:




// User authentication verification

function usernameAuth(username,password) {
    // TODO:
    var res = false;
    User.find({username: username}).then(function(results) {
		if (results.length > 0) {
				// login successful
            res = true;
		} else {
			// login failed:  show the login page again, passing an error string
			res = false;
		}
	});
    return res;
}

function usernameAuth2(username,password) {
    // TODO:
    return username==preusername &&password==prepassword;
}


// Routes

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.post('/login', function(req, res) {
    var username = req.body.user;
    var password = req.body.pass;
    
    if(usernameAuth2(username, password)) {
        res.sendFile(path.join(__dirname + '/public/home.html'),{username:username});
        //res.send(username);
        console.log(username + '/'+password+ 'Login Good !!!');
    } else {
        console.log(username + '/'+password+' Incorrect Username!!!');
    }
    
    
});

// Server port
app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'));
console.log('Server running at http://127.0.0.1:3000/');