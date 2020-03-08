var db = require('../database/sqlite-db');

exports.saveTransaction = async (transaction) => {
	var sql = `insert into transfer_transation (user_account_number, user_id, recipient_account_number, recipient_id, amount, comment, fee_type, transfered) values('${transaction.user_account_number}', '${transaction.user_id}', '${transaction.recipient_account_number}', '${transaction.recipient_id}', '${transaction.amount}', '${transaction.comment}', '${transaction.fee_type}', '${transaction.transfered}')`;
	await db.load(sql);
	var select = `select seq from sqlite_sequence where name="transfer_transation"`;
	return db.load(select);
}

exports.processTransaction = async (transaction) => {
	var userSql = `update user_bank_account set balance = balance - ${transaction.amount} where user_id = '${transaction.user_id}' and account_number = '${transaction.user_account_number}'`;
	var recipientSql = `update user_bank_account set balance = balance + ${transaction.amount} where user_id = '${transaction.recipient_id}' and account_number = '${transaction.recipient_account_number}'`;
	var updateTransaction = `update transfer_transation set transfered = 1 where id = '${transaction.id}'`;
	await db.load(userSql);
	await db.load(recipientSql);
	await db.load(updateTransaction);
	return true;
}

exports.getTransactionListByUserId = (userId) => {
	var sql = `select user_account_number, recipient_account_number, name, comment, amount, transfered` +
	 ` from transfer_transation join user on transfer_transation.recipient_id = user.id` +
	 ` where transfer_transation.user_id = '${userId}'`;
	return db.load(sql);
}