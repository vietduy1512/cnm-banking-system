
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_bank_account').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_bank_account').insert([
        {id: 1, account_number: 'abc', user_id: 1, balance: 100000, active: true},
        {id: 2, account_number: 'xyz', user_id: 1, balance: 200000, active: true},
        {id: 3, account_number: 'fse', user_id: 2, balance: 200000, active: true}
      ]);
    });
};
