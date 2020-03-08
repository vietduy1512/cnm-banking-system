var md5 = require('crypto-js/md5');
var db = require('../database/sqlite-db');

exports.loadAll = () => {
	var sql = 'select * from admin';
	return db.load(sql);
}

exports.removeAdminById = (id) => {
	var sql = `delete from admin where id = ${id}`;
	return db.load(sql);
}

exports.getAdminById = (id) => {
	var sql = `select * from admin where id = ${id}`;
	return db.load(sql);
}

exports.add = adminEntity => {
	// adminEntity = {
    //     Username: 1,
    //     Password: 'raw pwd',
    //     Name: 'name',
    //     Email: 'email'
	// }
	
    var md5_pwd = md5(adminEntity.password);
    var sql = `insert into admin (username, password, name, email) values('${adminEntity.username}', '${md5_pwd}', '${adminEntity.name}', '${adminEntity.email}')`;

    return db.load(sql);
}

exports.login = loginEntity => {
	// loginEntity = {
	// 	username: 'duylev',
	// 	password: '******'
	// }

    var md5_pwd = md5(loginEntity.password);
	var sql = `select * from admin where username = '${loginEntity.username}' and password = '${md5_pwd}'`;
	return db.load(sql);
}

exports.exec = (sql) => {
	return db.load(sql);
}
