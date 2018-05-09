var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/ex5_db');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() {  console.log("Error connecting to DB") });
console.log('Pending DB connection');

var Schema = mongo.Schema;
var userSchema = new Schema({ // create a schema
  cathegory: String,
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branchID: Number,
  //admin: Boolean,
  //location: String,
  //meta: { age: Number, website: String }, // field-object (with sub-fields)
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) { //callback
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

var User = db.model('User', userSchema);
module.exports = User;
