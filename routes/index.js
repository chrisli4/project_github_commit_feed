var express = require('express');
var fs = require('fs');
var git = require('../api.js');
var commits = require('../data/commits.json');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	fs.readFile('./data/commits.json', (err, data) => {
		if(err) throw err;

		const parsed = data.toString();
		res.render('index', { commitFeed: parsed });
	});
});

router.get('/commits', function(req, res, next) {

	const user = req.param('user');
	const repo = req.param('repo');
	let commitJSON = JSON.stringify(commits, null, 2);
	let notFound = '';

	git.getCommits(user, repo, (results) => {

		if(results === '404') {

			let notFound = 'Repo not found';
			res.render('index', { commitFeed: commitJSON,
							   	  notFound: notFound });

		} else {

			const entries = git.parse(results.data);
			
			entries.forEach((entry) => {

				commits[entry.sha] = entry;

			});

			console.log(commits);

			let commitJSON = JSON.stringify(commits, null, 2);			

			fs.writeFile('./data/commits.json', commitJSON, (err) => {
				if(err) throw err;
				console.log(commits);

				res.render('index', { commitFeed: commitJSON,
							   	  	  notFound: notFound });

			});
		};
	});
});

module.exports = router;
