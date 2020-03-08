
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {id: 1, username: 'admin', password: '21232f297a57a5a743894a0e4a801fc3', name: 'Admin', phone_number: '0938693329', email: 'admin@gmail.com'},
      ]);
    });
};
