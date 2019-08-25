'use strict'
	
		//Modelo de proyecto en base de datos

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var proyectModel = Schema({
	name: {type: String, lowercase: true},
	category: {type: String, lowercase: true},
	description: String,
	images: String,
	date: {type: Date, default: Date.now},
	url: {type: String, lowercase: true},
	git: {type: String, lowercase: true}
});

module.exports = mongoose.model('Proyect', proyectModel);