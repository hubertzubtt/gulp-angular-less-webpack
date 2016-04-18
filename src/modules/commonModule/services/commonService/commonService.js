function ServiceFn() {
	this.metoda = function() {
		console.log('halohalo');
		return 'Dane z serwisu';
	};
}

module.exports = ServiceFn;