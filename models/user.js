var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

console.log('Inside the User script.');

var userSchema = mongoose.Schema({
	local : {
		email: String,
		password: String
	}
});

userSchema.methods.generateHash = function(password) {
	console.log('generateHash');
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);