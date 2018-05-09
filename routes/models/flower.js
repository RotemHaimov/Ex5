var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/ex5_db');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');

var Schema = mongo.Schema;
var FlowerSchema = new Schema({ // create a schema
    //name: 'Kalanit' , color: 'red', picture: 'pics/Kalanit.jpg', price: 50
  name: String,
  color: String,
  picture: String,
  price: Number,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
FlowerSchema.pre('save', function(next) { //callback
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

var Flower = db.model('Flower', FlowerSchema);
module.exports = Flower;
