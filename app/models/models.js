var memberSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  email: String,
  password: String,
  give: String,
  take: String,
});

var projectSchema = new mongoose.Schema({
  title:  String,
  author: String,
});

var transactionSchema = new mongoose.Schema({
  member_send: String,
  member_receive: String,
  project: String,
  currency_array: String,
  currency_value_array:String,
  value : double,
});


var member = mongoose.model('member', memberSchema);
var project = mongoose.model('project', projectSchema);
var transactions = mongoose.model('transcations', transactionSchema);