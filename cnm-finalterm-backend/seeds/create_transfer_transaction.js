
exports.seed = function(knex, Promise) {
  return knex('transfer_transation').del()
  .then(function () {
    // Inserts seed entries
    return knex('transfer_transation').insert([
      {id: 1, user_account_number: 'abc', user_id: 1, recipient_account_number: 'fse', recipient_id: 2, amount: 2000, fee_type: 'sender_pay', transfered: 0}
    ]);
  });
};
