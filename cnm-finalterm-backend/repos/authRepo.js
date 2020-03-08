var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var jwtDecode = require('jwt-decode');
var userRepo = require('../repos/userRepo');

var db = require('../database/sqlite-db');

const SECRET = 'VIETDUY';
const AC_LIFETIME = 600; // seconds



exports.checkExistUsername = (username) => {
	var sql = `select 1 from user where username = '${username}'`;
	return db.load(sql);
}
exports.checkExistEmail = (email) => {
	var sql = `select 1 from user where email = '${email}'`;
	return db.load(sql);
}

exports.generateAccessToken = userEntity => {
      // TODO: remove password from acToken
    var payload = {
        user: userEntity,
        info: 'more info'
    }

    var token = jwt.sign(payload, SECRET, {
        expiresIn: AC_LIFETIME
    });

    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    var acToken = req.cookies['d-access-token'];
    var rfToken = req.cookies['d-refresh-token'];
    var userId = req.cookies['d-user-id'];
    
    var decoded = jwtDecode(acToken);
    if (parseInt(userId) != decoded.user.id) {
        res.statusCode = 401;
        res.json({
            msg: 'INVALID LOGIN'
        })
    }

    if (acToken) {
        jwt.verify(acToken, SECRET, (err, payload) => {
            if (err) {
                if (err.name == "TokenExpiredError") {

                    var sql = `select user_id from user_refresh_token_ext where refresh_token = '${rfToken}'`;
                    db.load(sql)
                        .then(value => {
                            if (value[0]) {
                                userRepo.getUserById(value[0].user_id)
                                    .then(user => {
                                        if (user[0]) {
                                            var newAcToken = this.generateAccessToken(user[0]); 
                                            var newRfToken = this.generateRefreshToken();
                                            this.updateToken(user[0].id, newAcToken, newRfToken, res)
                                                .then(value => {
                                                    next();
                                                });
                                        };
                                    });
                            } else {
                                res.statusCode = 401;
                                res.json({
                                    msg: 'INVALID REFRESH TOKEN',
                                    error: err
                                })
                            }
                        });
                } else {
                    res.statusCode = 401;
                    res.json({
                        msg: 'INVALID ACCESS TOKEN',
                        error: err
                    })
                }
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 401;
        res.json({
            msg: 'NO_TOKEN'
        })
    }
}

exports.generateRefreshToken = () => {
    const SIZE = 80;
    return rndToken.generate(SIZE);
}

exports.updateToken = (userId, acToken, rfToken, res) => {
    res.cookie('d-user-id', userId);
    res.cookie('d-access-token', acToken);
    res.cookie('d-refresh-token', rfToken);

    return new Promise((resolve, reject) => {

        var sql = `delete from user_refresh_token_ext where user_id = ${userId}`;
        db.load(sql) // delete
            .then(value => {
                sql = `insert into user_refresh_token_ext (user_id, refresh_token) values(${userId}, '${rfToken}')`;
                return db.load(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}