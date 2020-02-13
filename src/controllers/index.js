const path = require('path');
const fs = require('fs');

const Controller = {};

fs.readdirSync(path.join(__dirname)).forEach(file => {
	let filename = path.basename(file, '.js');

	if (file.includes('Controller')) {
		Controller[filename] = require(path.join(__dirname, file));
	}

});

module.exports = Controller;