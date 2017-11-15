
const sort = {};

sort.process = (type, direct, commits) => {

	if(type === 'sortAuthor' && direct === 'desc')
		return commits.sort(_authDesc);
	if(type === 'sortAuthor' && direct === 'asc')
		return commits.sort(_authAsc);
	if(type === 'sortEmail' && direct === 'desc')
		return commits.sort(_emailDesc);
	if(type === 'sortEmail' && direct === 'asc')
		return commits.sort(_emailAsc);
	if(type === 'sortMessage' && direct === 'desc')
		return commits.sort(_messageDesc);
	if(type === 'sortMessage' && direct === 'asc')
		return commits.sort(_messageAsc);
	if(type === 'sortDate' && direct === 'desc')
		return commits.sort(_dateDesc);
	if(type === 'sortDate' && direct === 'asc')
		return commits.sort(_dateAsc);
};

const _authAsc = (a, b) => {
	const nameA = a.author.toUpperCase();
	const nameB = b.author.toUpperCase();

	if(nameA < nameB) 
		return -1;
	if(nameA > nameB)
		return 1;
	return 0;
};

const _authDesc = (a, b) => {
	const nameA = a.author.toUpperCase();
	const nameB = b.author.toUpperCase();

	if(nameA > nameB) 
		return -1;
	if(nameA < nameB)
		return 1;
	return 0;
};

const _emailAsc = (a, b) => {
	const nameA = a.email.toUpperCase();
	const nameB = b.email.toUpperCase();

	if(nameA < nameB) 
		return -1;
	if(nameA > nameB)
		return 1;
	return 0;
};

const _emailDesc = (a, b) => {
	const nameA = a.email.toUpperCase();
	const nameB = b.email.toUpperCase();

	if(nameA > nameB) 
		return -1;
	if(nameA < nameB)
		return 1;
	return 0;
};

const _messageAsc = (a, b) => {
	const nameA = a.message.toUpperCase();
	const nameB = b.message.toUpperCase();

	if(nameA < nameB) 
		return -1;
	if(nameA > nameB)
		return 1;
	return 0;
};

const _messageDesc = (a, b) => {
	const nameA = a.message.toUpperCase();
	const nameB = b.message.toUpperCase();

	if(nameA > nameB) 
		return -1;
	if(nameA < nameB)
		return 1;
	return 0;
};

const _dateDesc = (a, b) => {
	const dateA = new Date(a.date);
	const dateB = new Date(b.date);

	if(dateA < dateB)
		return 1;
	if(dateA > dateB)
		return -1;
	else 
		return 0;
};

const _dateAsc = (a, b) => {
	const dateA = new Date(a.date);
	const dateB = new Date(b.date);

	if(dateA > dateB)
		return 1;
	if(dateA < dateB)
		return -1;
	else 
		return 0;
};

module.exports = sort;

