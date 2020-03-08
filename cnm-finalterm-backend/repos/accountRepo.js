var db = require('../database/sqlite-db');

exports.getAccountListByUserId = (userId) => {
	var sql = `select * from user_bank_account where user_id = '${userId}'`;
	return db.load(sql);
}

exports.getAccountByAccountNumber = (account_number) => {
	var sql = `select * from user_bank_account where account_number = '${account_number}'`;
	return db.load(sql);
}

exports.getUserIdByAccountNumber = (account_number) => {
	var sql = `select user_id from user_bank_account where account_number = '${account_number}'`;
	return db.load(sql);
}

exports.saveAccount = (account) => {
	var sql = `insert into user_bank_account (account_number, user_id, balance, active) values('${account.account_number}', '${account.user_id}', '${account.balance}', '${account.active}')`;
	return db.load(sql);
}

exports.addBalance = (account_number, user_id, addBalance) => {
	var sql = `update user_bank_account set balance = balance + ${addBalance} where user_id = '${user_id}' and account_number = '${account_number}'`;
	return db.load(sql);
}

exports.shutdown = (account_number, user_id) => {
	var sql = `delete from user_bank_account where user_id = '${user_id}' and account_number = '${account_number}'`;
	return db.load(sql);
}