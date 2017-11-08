const Github = require('github');

const git = {};

git.getCommits = (owner, repo, done) => {

	const github = new Github({
		debug: true
	});

	github.authenticate({
		type: 'token',
		token: 'bb2c5176e363b4b1fcd7ba47948e78eff2a970c1'	
	});

	const info = { owner: owner,
					   		 repo: repo };

	github.repos.getCommits(info, (error, commits) => {
		if(error) 
			done('404');
		else
			done(commits);
	});
};

git.parse = (data) => {
		
		return data.map((item) => {

			return { sha: item.sha,
							 author: item.author,
							 html: item.html_url,
							 message: item.commit.message
							}
		});
}


module.exports = git;