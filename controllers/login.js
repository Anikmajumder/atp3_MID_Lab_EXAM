var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');

router.get('/', function(req, res){
	console.log('login page requested!');
 	res.render('login/index');
 });
router.get('/register', function(req, res){
	console.log('login page requested!');
	res.render('login/register');
});

router.post('/', function(req, res){
		
		var user ={
			username: req.body.uname,
			password: req.body.password
		};

		userModel.validate(user, function(status){
			if(status){
				
				res.cookie('username', req.body.uname);
				res.redirect('/home');
			}else{
				res.redirect('/login');
			}
		});
});
router.post('/register', function(req, res){

	// var user = {
	// 	username: req.body.username,
	// 	password: req.body.password,
	// 	type: req.body.type
	// };
	
	req.checkBody('username', 'Name field cannot be empty.').notEmpty();
	//req.checkBody('username', "Username can only must include one lowercase character, one uppercase character,").matches(/^[A-Za-z_-]+$/, "i");
	req.checkBody('password', 'Password must be between 4-60 characters long.').len(4, 60);
	//req.checkBody('password', "Password must include one lowercase character, one uppercase character, a number").matches(/^[A-Za-z0-9_-]+$/, "i");
	req.checkBody('type', 'Type field cannot be empty.').notEmpty();
	req.checkBody('contact', 'contact field cannot be empty.').notEmpty();
	req.checkBody('uname', 'Username field cannot be empty.').notEmpty();
	
	
	const err = req.validationErrors();
	
	if(err){		
	res.render('login/register', {errors: err});
	//console.log(err);
	}else{
	var user = {
	username: req.body.username,
	uname: req.body.uname,
	password: req.body.password,
	contact: req.body.contact,
	type: req.body.type
	};
	userModel.insert(user, function(status){
		if(status){
			res.redirect('/login');
		}else{
			res.redirect('/login/register');
		}
	});
	//res.send('login successful');
	}
	
	})
module.exports = router;

