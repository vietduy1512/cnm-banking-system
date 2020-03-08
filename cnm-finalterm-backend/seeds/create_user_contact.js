
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_contact').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_contact').insert([
        {id: 1, user_id: 1, recipient_account_number: 'fse', recipient_name: "An An"},
        {id: 2, user_id: 2, recipient_account_number: 'abc', recipient_name: "Lê Viết Duy"},
      ]);
    });
};
