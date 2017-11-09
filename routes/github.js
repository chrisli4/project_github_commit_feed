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
	res.statusCode = 200;
	res.end('ok');

});

module.exports = router;