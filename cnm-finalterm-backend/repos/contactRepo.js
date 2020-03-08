var db = require('../database/sqlite-db');

exports.getContactListByUserId = (userId) => {
	var sql = `select * from user_contact where user_id = '${userId}'`;
	return db.load(sql);
}

exports.addContact = (contact) => {
	var sql = `insert into user_contact (user_id, recipient_account_number, recipient_name) values('${contact.user_id}', '${contact.recipient_account_number}', '${contact.recipient_name}')`;
	return db.load(sql);
}

exports.checkExistContact = (user_id, recipient_account_number) => {
	var sql = `select 1 from user_contact where user_id = '${user_id}' and recipient_account_number = '${recipient_account_number}'`;
	return db.load(sql);
}