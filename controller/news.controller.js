var mongoose = require('mongoose');
const DataModel = require('../models/news.model');

exports.create = function(req,res,next){
	const dataModel = new DataModel(req.body);

	dataModel.save()
	.then(data=>{
		res.json(data);
	})
}

exports.get = function(req,res,next){
	var id = req.params.id;

	DataModel.findById(id, function (err, data) {
	  res.json(data);
	})
}


exports.update = function(req,res,next){
	const id = req.params.id;

	DataModel.findByIdAndUpdate(id, {$set: req.body}, {new:false})
	.then(data=>{
		res.json(data);
	})

}

exports.remove = function(req,res,next){
	const id = req.params.id;

	DataModel.findByIdAndRemove(id,function(err,data){
		res.json(data);
	})
	
}

exports.list = function(req,res,next){
	var page = (req.body.page) ? req.body.page : 1;
	var limit = (req.body.limit) ? req.body.limit : 5;

	var queryCondition = {};
	if(req.body.name && req.body.name.trim().length>0){
		name = req.body.name;
		queryCondition = {
			"name" : new RegExp(name, 'i')
		}
	}

	DataModel.paginate(queryCondition, { page: parseInt(page), limit: parseInt(limit) }, function(err, result) {
	 	result.rows = result.docs;
	 	delete result.docs;
	 	res.json(result)
	});
	
}