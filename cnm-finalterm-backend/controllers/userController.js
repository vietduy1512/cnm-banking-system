var authRepo = require('../repos/authRepo');
var userRepo = require('../repos/userRepo');
const axios = require('axios');

exports.getUsersList = async function (req, res) {
	var users = await userRepo.loadAll();
	res.json({
		users: users,
	})
}

exports.register_post = async function (req, res) {

	var ExistUsernames = await authRepo.checkExistUsername(req.body.username);
	var ExistEmails = await authRepo.checkExistEmail(req.body.email);
	
	if (ExistUsernames.length > 0) {
			res.json({
				result: false,
				msg: 'Username is already exist'
			})
	} else if (ExistEmails.length > 0) {
		if (ExistEmails.length > 0) {
			res.json({
				result: false,
				msg: 'Email is already exist'
			})
		}
	} else {
		var entity = {
			username: req.body.username,
			name: req.body.name,
			email: req.body.email,
			phone_number: req.body.phone_number,
			password: req.body.password
		}
			
		userRepo.add(entity)
			.then(() => {
				res.json({
					result: true,
					msg: 'Register successfully'
				})
			})
			.catch(err => {
				console.log(err);
				res.statusCode = 500;
				res.end('View error log on console');
			})
	}
}


exports.login_post = function (req, res) {
	var entity = {
		username: req.body.username,
		password: req.body.password,
		recaptcha: req.body.recaptcha
	};

	if(entity.recaptcha === undefined 
		|| entity.recaptcha === '' 
		|| entity.recaptcha === null)
  {
		return res.json({
			result: false,
			error: 'Please select captcha first'
		});
  }
	// TODO: add my key: const secretKey = "6LdReYEUAAAAAHS4Zgh5nTt3Uf3OXbq-t4w9twQf";
	const secretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

	axios.get(verificationURL)
  	.then(response => {
			if(response.data.success !== undefined && !response.data.success) {
				return res.json({
					result: false,
					error: 'Failed captcha verification'
				});
			}
			userRepo.login(entity)
			.then(rows => {
				if (rows.length > 0) {
					var userEntity = rows[0];
					var acToken = authRepo.generateAccessToken(userEntity);
					var rfToken = authRepo.generateRefreshToken();

					authRepo.updateToken(userEntity.id, acToken, rfToken, res)
						.then(() => {
							res.json({
								result: true,
								status: 'Login successfully'
							})
						})
						.catch(err => {
							console.log(err);
							res.statusCode = 500;
							res.end('View error log on console');
						})
				} else {
					res.json({
						result: false,
						error: 'Your username or password is incorrect'
					})
				}
			})
			.catch(err => {
				console.log(err);
				res.statusCode = 500;
				res.end('View error log on console');
			})
		})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
}