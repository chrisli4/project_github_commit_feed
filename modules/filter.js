const filter = {};

const _find = (input, param, entry) => {
	if(input === '')
		return true;
	if(param === 'date')
		return entry[param].slice(0,10) === input;
	if(param === 'message')
		return entry[param].indexOf(input) !== -1;
	else
		return entry[param] === input;
};

const _sha = (input, entry) => {

	return _find(input, 'sha', entry);
};

const _author = (input, entry) => {
	return _find(input, 'author', entry);
};

const _email = (input, entry) => {
	return _find(input, 'email', entry);
};

const _date = (input, entry) => {
	return _find(input, 'date', entry);
};

const _message = (input, entry) => {
	return _find(input, 'message', entry);
};

const _compare = (inputs, entry) => {

	return _sha(inputs.sha, entry) && 
		   _author(inputs.author, entry) && 
		   _email(inputs.email, entry) && 
		   _date(inputs.date, entry) && 
		   _message(inputs.message, entry)
};

filter.process = (inputs, commits) => {
	//inputs - obj of filters.
	//commits - JSON obj from file.

	const filtered = {};

	for(var entry in commits) {
		if(commits.hasOwnProperty(entry)) {

			if(_compare(inputs, commits[entry]))
				filtered[entry] = commits[entry];
		}
	};
	//filtered obj
	return filtered;
}


module.exports = filter;