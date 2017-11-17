const Github = require('github');

const git = {};

git.getCommits = (owner, repo, done) => {
	const github = new Github({
		debug: true
	});

	github.authenticate({
		type: 'token',
		token: 'd53072df4ed6803312a0f5afc93be0ae451b0e3a'	
	});

	github.repos.getCommits({ owner: owner, repo: repo }, (error, commits) => {
		if(error) 
			done('404');
		else
			done(commits);
	});
};

git.extract = (data) => {

		console.log(data);

		return data.map((item) => {
			return { 
						sha: item.sha,
					 	author: item.commit.author.name,
					 	date: item.commit.author.date,
					 	email: item.commit.author.email,
					 	count: item.commit.comment_count,
					 	url: item.author.url,
					 	html: item.html_url,
					 	message: item.commit.message
					};
		});
};

module.exports = git;