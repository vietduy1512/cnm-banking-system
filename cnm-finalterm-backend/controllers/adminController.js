var authRepo = require('../repos/authRepo');
var adminRepo = require('../repos/adminRepo');
const axios = require('axios');

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
			adminRepo.login(entity)
			.then(rows => {
				if (rows.length > 0) {
					var adminEntity = rows[0];
					var acToken = authRepo.generateAccessToken(adminEntity);
					var rfToken = authRepo.generateRefreshToken();

					authRepo.updateToken(adminEntity.id, acToken, rfToken, res)
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