const Github = require('github');

const git = {};

git.getCommits = (owner, repo, done) => {
	const github = new Github({
		debug: true
	});

	github.authenticate({
		type: 'token',
		token: '85e6343c92b565dc1230041d197e1eb170d90b8c'	
	});

	github.repos.getCommits({ owner: owner, repo: repo }, (error, commits) => {
		if(error) 
			done('404');
		else
			done(commits);
	});
};

git.extract = (data) => {
		return data.map((item) => {
			return { 
						sha: item.sha,
					 	author: item.commit.author.name,
					 	date: item.commit.author.date,
					 	email: item.commit.author.email,
					 	url: item.author.url,
					 	html: item.html_url,
					 	message: item.commit.message
					};
		});
};

module.exports = git;