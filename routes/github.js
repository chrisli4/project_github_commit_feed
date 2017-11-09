var express = require('express');
var fs = require('fs');
var git = require('../api.js');
var commits = require('../data/commits.json');
var router = express.Router();

router.post('/webhooks', (req, res) => {

	console.log(req);

	var _headers = {
	  "Content-Type": "text/html",
	  "Access-Control-Allow-Origin": "*",
	  "Access-Control-Allow-Headers": "Content-Type",
	  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE"
	};

	res.writeHead(200, _headers);

	req.on('data', (data) => {
		content += data;
	});

	req.on('end', () => {
		var data = JSON.parse(content);
		res.end('200');
	});


});

module.exports = router;