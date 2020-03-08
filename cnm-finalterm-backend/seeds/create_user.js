
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, username: 'duylev', password: 'b972e26e93882f98bcf2f9dd3d2dab58', name: 'Lê Viết Duy', phone_number: '0938693329', email: 'vietduy1512@gmail.com'},
        {id: 2, username: 'thienan', password: '9feb5a1b5f3455bc4a97c03f191db6e6', name: 'An An', phone_number: '0938989898', email: 'testing@gmail.com'},
      ]);
    });
};
