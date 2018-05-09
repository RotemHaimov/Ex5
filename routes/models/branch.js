var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/ex5_db');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');

var Schema = mongo.Schema;
var BranchSchema = new Schema({ // create a schema
    //name: 'Branch1', active:true,  address: 'Keren Hayesod 16', phone:'0547875785', id:1
  name: String,
  active: Boolean,
  address: String,
  phone: String,
  //id: Number,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
BranchSchema.pre('save', function(next) { //callback
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

var Branch = db.model('Branch', BranchSchema);
module.exports = Branch;
