
const parser = {};

parser.add = (data, entries) => {
	//data - JSON object
	//entries - Array of objects

	entries.forEach((entry) => {
		data[entry.sha] = entry;
	});
	return data;
};

parser.convert = (commits) => {
	//commits - object

	const arr = [];
	for(let entry in commits) {
		arr.push(commits[entry]);
	}
	return arr;
};

module.exports = parser;

