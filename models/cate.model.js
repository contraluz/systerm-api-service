var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');

var schema = new mongoose.Schema({ 
	text:String
 });
schema.plugin(materializedPlugin);
var Cate = mongoose.model('Cate',  schema,'cate'); 
module.exports = Cate;

