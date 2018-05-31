const debug = require('debug')('ex5:fillDataBases');
var User = require("./user");
var Branch = require("./branch");
var Flower = require("./flower");

//{name: 'Branch1', active:true,  address: 'Keren Hayesod 16', phone:'0547875785', id:1},
//{name: 'Branch2', active:false, address: 'Havaad Vleumi 21', phone:'023859431', id:2},

function fillDBs()
{
    fillBranches();
    fillFlowers();
    fillUsers();
}
function fillBranches() {
    // create more branches
    Branch({
        name: 'Branch1',
        active: 1,
        address: 'Talpiot',
        phone: '987654321',
    }).save(function (err) {
        if (err) throw err;
        debug('Branch created!');
    });
    Branch({
        name: 'Branch2',
        active: 1,
        address: 'Kiryat Moshe',
        phone: '101010101',
    }).save(function (err) {
        if (err) throw err;
        debug('Branch created!');
    });
}
/*{name: 'Kalanit' , color: 'red', picture: 'pics/Kalanit.jpg', price: 50},
	{name: 'Narkis' , color: 'yello', picture: 'pics/Narkis.jpg', price: 150},
	{name: 'Rakefet' , color: 'purple', picture: 'pics/Rakefet.jpg', price: 40},
	{name: 'Sahlav' , color: 'white', picture: 'pics/Sahlav.jpg', price: 58},
    {name: 'Vered' , color: 'pink', picture: 'pics/Vered.jpg', price: 77},*/
/*name: String,
  color: String,
  picture: String,
  price: Number,*/

function fillFlowers() {
    Flower({
        name: 'Vered',
        color: 'pink',
        picture: 'pics/Vered.jpg',
        price: 77
    }).save(function (err) {
        if (err) throw err;
        debug('Flower created!');
    });
    Flower({
        name: 'Sahlav',
        color: 'white',
        picture: 'pics/Sahlav.jpg',
        price: 58
    }).save(function (err) {
        if (err) throw err;
        debug('Flower created!');
    });
    Flower({
        name: 'Rakefet',
        color: 'purple',
        picture: 'pics/Rakefet.jpg',
        price: 40
    }).save(function (err) {
        if (err) throw err;
        debug('Flower created!');
    });
    Flower({
        name: 'Kalanit',
        color: 'red',
        picture: 'pics/Kalanit.jpg',
        price: 50
    }).save(function (err) {
        if (err) throw err;
        debug('Flower created!');
    });
    Flower({
        name: 'Narkis',
        color: 'yello',
        picture: 'pics/Narkis.jpg',
        price: 150
    }).save(function (err) {
        if (err) throw err;
        debug('Flower created!');
    });
}
/*{cathegory: 'manager', name: 'Dan Sason', username: 'a', password: 'a'},
	{cathegory: 'manager', name: 'Avi Kohen', username: 'aaaa', password: '1111'},
	{cathegory: 'manager', name: 'Guy Shtulman', username: 'bbbb', password: '2222'},
	{cathegory: 'worker', name: 'Yaakov Levi', branchID:1, username: 'ylevi', password: '1234'},
	{cathegory: 'worker', name: 'Shalom Baba', branchID:1, username: 'b', password: 'b'},
	{cathegory: 'worker', name: 'Shimon Hai', branchID:2, username: 'shai', password: 'abcd'},
	{cathegory: 'customer', name: 'Ran Yosef'},
    {cathegory: 'customer', name: 'David Baruch'},*/
/*cathegory: String,
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branchID: Number,*/
function fillUsers() {
    User({
        cathegory: 'manager',
        name: 'Rotem Haimov',
        username: 'Rotem',
        password: 'r',
        branchID: -1
      }).save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
      User({
        cathegory: 'manager',
        name: 'David Meushar',
        username: 'David',
        password: 'd',
        branchID: -1
      }).save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
      User({
        cathegory: 'manager',
        name: 'Guy Shtulman',
        username: 'Guy',
        password: 'g',
        branchID: -1
      }).save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
      User({
        cathegory: 'worker',
        name: 'Yakov Levi',
        username: 'Yakov',
        password: 'y',
        branchID: 1
      }).save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
      User({
        cathegory: 'worker',
        name: 'Shalom Baba',
        username: 'Shalom',
        password: 's',
        branchID: 1
      }).save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
      User({
        cathegory: 'worker',
        name: 'Ran Yosef',
        username: 'Ran',
        password: 'ra',
        branchID: 1
      }).save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
      User({
        cathegory: 'customer',
        name: 'Moshe Man',
        username: 'Moshe',
        password: 'mo',
        branchID: -1
      }).save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
      User({
        cathegory: 'customer',
        name: 'Shlomo Lubliner',
        username: 'Shlomo',
        password: 'sh',
        branchID: -1
      }).save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
}

module.exports = fillDBs;
