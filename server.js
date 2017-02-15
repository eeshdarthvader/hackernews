var express = require('express');

var app = express();


var path =require('path');


var swig = require('swig');

/*
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
*/








app.engine('html',swig.renderFile);

app.set('views',path.join(__dirname,'src/views'));

app.set('view engine','html');





port = 5000;

app.listen(port, function(err){
	
	console.log("server running at:"+ port );
	
})





app.use(express.static('public'));




app.get('/', function(request, response){
	

	
	response.render('index');
	
	
});




/*
passport.use(new Strategy(
  function(username, password, cb) {
	  
    adminCtrl.findUserByUsername(username, function(err, user) {
      if (err) { console.log("login err 1");  return cb(err); }
      if (!user) { console.log("login err 2"); return cb(null, false); }
      if (user.password != password) { console.log("login err 3",password," user pwd ",user); return cb(null, false); }
      console.log("login success 1");
      return cb(null, user);
    });
}));


passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  adminCtrl.findUserByUsername(username, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
*/







var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



/*
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(expressSession({secret:'123',resave: true,
    saveUninitialized: true}));

var sess;
*/



var mongoose = require('mongoose');













