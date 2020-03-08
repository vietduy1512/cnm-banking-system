
exports.up = function(knex, Promise) {
    return knex.schema.createTable('admin', function(t) {
        t.increments('id').primary()
        t.string('username').notNullable()
        t.string('password').notNullable()
        t.string('name').notNullable()
        t.string('phone_number').notNullable()
        t.string('email').notNullable()
        t.timestamps(false, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('admin')
};