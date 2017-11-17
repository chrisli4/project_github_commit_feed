const express = require('express');
const fs = require('fs');
const git = require('../modules/api.js');
const parser = require('../modules/parser.js');
const commits = require('../data/commits.json');
const router = express.Router();

router.post('/webhooks', (req, res) => {

	var headers = {
	  "Content-Type": "text/html",
	  "Access-Control-Allow-Origin": "*",
	  "Access-Control-Allow-Headers": "Content-Type",
	  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE"
	};

	const webHookData = JSON.parse(req.body.payload);

	const owner = webHookData.pusher.name;
	const repo = webHookData.repository.name;

	res.writeHead('200', headers);
	res.end('ok!!');

	git.getCommits(owner, repo, (results) => {
		
		const entries = git.extract(results.data);
		const newData = parser.add(commits, entries);

		let parsed = parser.convert(newData);
		let dataJSON = JSON.stringify(newData, null, 2);

		fs.writeFile('./data/commits.json', dataJSON, (error) => {
			if(error) console.log('Fail to write file');
			else console.log('FILE WRITTEN');
		});
		
	});
});

module.exports = router;