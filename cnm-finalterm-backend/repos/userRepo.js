var md5 = require('crypto-js/md5');
var db = require('../database/sqlite-db');

exports.loadAll = () => {
	var sql = 'select * from user';
	return db.load(sql);
}

exports.removeUserById = (id) => {
	var sql = `delete from user where id = ${id}`;
	return db.load(sql);
}

exports.getUserById = (id) => {
	var sql = `select * from user where id = ${id}`;
	return db.load(sql);
}

exports.add = userEntity => {
	// userEntity = {
    //     Username: 1,
    //     Password: 'raw pwd',
    //     Name: 'name',
    //     Email: 'email'
	// }
	
    var md5_pwd = md5(userEntity.password);
    var sql = `insert into user (username, password, name, email, phone_number) values('${userEntity.username}', '${md5_pwd}', '${userEntity.name}', '${userEntity.email}', '${userEntity.phone_number}')`;

    return db.load(sql);
}

exports.login = loginEntity => {
	// loginEntity = {
	// 	username: 'duylev',
	// 	password: '******'
	// }

    var md5_pwd = md5(loginEntity.password);
	var sql = `select * from user where username = '${loginEntity.username}' and password = '${md5_pwd}'`;
	return db.load(sql);
}

exports.exec = (sql) => {
	return db.load(sql);
}
