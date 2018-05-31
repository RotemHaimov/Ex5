var express = require('express');
var router = express.Router();
var debug = require('debug')('ex5:index');

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
//
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var User = require("./models/user");
var Branch = require("./models/branch");
var Flower = require("./models/flower");
//var fillDB=require('./models/fillDataBases')();

router.post('/login', async function(req,res) {
	var userName = req.body.username;
	var pass = req.body.password;
	var answer="";
	user=await User.findOne({username: req.body.username, password: req.body.password}).exec();
	debug("username: "+userName+"\n password: "+pass);
	if(user!=null) answer=user.cathegory;
	res.send(answer);
});

router.post('/About', function(req,res) {
	console.log("about, "+req.body.user+".");
	res.render('partials/main_contents/about.ejs');
});

router.post('/Contact', function(req,res) {
	console.log("contact, "+req.body.user+".");
	res.render('partials/main_contents/contact.ejs');
});

router.post('/Catalog', async function(req,res) {
	console.log("catalog, "+req.body.user+".");
	var flowers=await Flower.find().exec();
	//debug("flowers: \n"+flowers);
	res.render('partials/main_contents/catalog.ejs', {Flowers: /*Flower.find().exec()*/flowers});
});

router.post('/ManageUsers', async function(req,res) {
	console.log("manage users, "+req.body.user+".");
	var users=await User.find().exec();
	var user=await User.findOne({username: req.body.user}).exec();
	//debug("\nuser:\n"+user);
	if(user!=null)
	{
		if(user.cathegory=="manager") res.render('partials/main_contents/manageusersManager.ejs', {Users: users});
		else if(user.cathegory=="worker") res.render('partials/main_contents/manageusersWorker.ejs', {Users: users});
	}
	else res.render();
});

router.post('/ManageBranches', async function(req,res) {
	console.log("manage branches, "+req.body.user+".");
	var user=await User.findOne({username: req.body.user}).exec();
	var branches= null;
	if(user.cathegory=="manager")
		branches= await Branch.find().exec();
	res.render('partials/main_contents/managebranches.ejs', {Branches: branches});
});

router.post('/addCustomer', async function(req,res) {
	var userToAdd=req.body.userToAdd;
	var users=await User.find().exec();
	var user=await User.findOne({username: req.body.user}).exec();
	debug(user);
	if(user==null) return;
	User({
		cathegory: 'customer',
		name: userToAdd,
		username: '-1',
		password: '-1',
		branchID: -1
	}).save(function(err) {
		if (err) throw err;
		debug('Customer Added!');
	});

	if(user.cathegory=="manager") res.render('partials/main_contents/manageusersManager.ejs', {Users: users});
	else if(user.cathegory=="worker") res.render('partials/main_contents/manageusersWorker.ejs', {Users: users});
});

module.exports = router;
