var template = require('./testDirective.html');

function DirectiveFn() {
	return {
		templateUrl: template
	}
}

module.exports = DirectiveFn;
