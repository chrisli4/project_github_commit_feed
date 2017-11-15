const express = require('express');
const fs = require('fs');
const git = require('../modules/api.js');
const filter = require('../modules/filter');
const parser = require('../modules/parser');
const sorter = require('../modules/sort')
const commits = require('../data/commits.json');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	let parsed = parser.convert(commits);
	res.render('index', { commitFeed: parsed });

});

router.get('/commits', function(req, res, next) {

	const user = req.query.user;
	const repo = req.query.repo;

	let found = '';

	git.getCommits(user, repo, (results) => {

		if(results === '404') {

			let found = 'Repository Not Found!';
			let parsed = parser.convert(commits);

			res.render('index', { commitFeed: parsed, found: found });

		} else {

			const entries = git.extract(results.data);
			const newData = parser.add(commits, entries);

			let parsed = parser.convert(newData);
			let dataJSON = JSON.stringify(newData, null, 2);

			fs.writeFile('./data/commits.json', dataJSON, (error) => {
				if(error) console.log('Fail to write file');

				res.render('index', { commitFeed: parsed, found: found });

			});
		}
	});
});

router.get('/filter', function(req, res, next) {

	const sha = req.query.sha;
	const author = req.query.author;
	const email = req.query.email;
	const date = req.query.date;
	const message = req.query.message;
	const select = req.query.select;
	const direct = req.query.direct; 

	const filtered = filter.process(req.query, commits);
	const parsed = parser.convert(filtered);
	const sorted = sorter.process(select, direct, parsed);

	res.render('index', { commitFeed: sorted });

});

module.exports = router;




