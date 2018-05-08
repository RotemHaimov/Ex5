var express = require('express');
var router = express.Router();

var branches=[
	{name: 'Branch1', active:true,  address: 'Keren Hayesod 16', phone:'0547875785', id:1},
	{name: 'Branch2', active:false, address: 'Havaad Vleumi 21', phone:'023859431', id:2},
];
var users=[
	{cathegory: 'manager', name: 'Dan Sason', username: 'a', password: 'a'},
	{cathegory: 'manager', name: 'Avi Kohen', username: 'aaaa', password: '1111'},
	{cathegory: 'manager', name: 'Guy Shtulman', username: 'bbbb', password: '2222'},
	{cathegory: 'worker', name: 'Yaakov Levi', branchID:1, username: 'ylevi', password: '1234'},
	{cathegory: 'worker', name: 'Shalom Baba', branchID:1, username: 'b', password: 'b'},
	{cathegory: 'worker', name: 'Shimon Hai', branchID:2, username: 'shai', password: 'abcd'},
	{cathegory: 'customer', name: 'Ran Yosef'},
	{cathegory: 'customer', name: 'David Baruch'},
];
var flowers=[
	{name: 'Kalanit' , color: 'red', picture: 'pics/Kalanit.jpg', price: 50},
	{name: 'Narkis' , color: 'yello', picture: 'pics/Narkis.jpg', price: 150},
	{name: 'Rakefet' , color: 'purple', picture: 'pics/Rakefet.jpg', price: 40},
	{name: 'Sahlav' , color: 'white', picture: 'pics/Sahlav.jpg', price: 58},
	{name: 'Vered' , color: 'pink', picture: 'pics/Vered.jpg', price: 77},
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req,res) {
	var userName = req.body.username;
	var pass = req.body.password;
	var answer="";
	users.forEach(element => {
		if(element.username==userName && element.password==pass)
		{
			answer = element.cathegory;
		}
	});
	res.send(answer);
	console.log(answer);
});

router.post('/About', function(req,res) {
	console.log("about, "+req.body.user+".");
	res.render('partials/main_contents/about.ejs');
});

router.post('/Contact', function(req,res) {
	console.log("contact, "+req.body.user+".");
	res.render('partials/main_contents/contact.ejs');
});

router.post('/Catalog', function(req,res) {
	console.log("catalog, "+req.body.user+".");
	res.render('partials/main_contents/catalog.ejs', {Flowers: flowers});
});

router.post('/ManageUsers', function(req,res) {
	console.log("manage users, "+req.body.user+".");
	users.forEach(function(user){
		if(user.username==req.body.user)
		{
			if(user.cathegory=="manager") res.render('partials/main_contents/manageusersManager.ejs', {Users: users});
			else if(user.cathegory=="worker") res.render('partials/main_contents/manageusersWorker.ejs', {Users: users});
		}
	});
});

router.post('/ManageBranches', function(req,res) {
	console.log("manage branches, "+req.body.user+".");
	res.render('partials/main_contents/managebranches.ejs', {Branches: branches});
});

router.post('/addCustomer', function(req,res) {
	
	var userToAdd=req.body.userToAdd;
	var username=req.body.user;
	users.push({cathegory: "customer", name: userToAdd});
	//console.log("toAdd: "+userToAdd+" user: "+user);
	users.forEach(function(user){
		//console.log(user);
		if(user.username==username)
		{
			if(user.cathegory=="manager") res.render('partials/main_contents/manageusersManager.ejs', {Users: users});
			else if(user.cathegory=="worker") res.render('partials/main_contents/manageusersWorker.ejs', {Users: users});
		}
	});
});

module.exports = router;
