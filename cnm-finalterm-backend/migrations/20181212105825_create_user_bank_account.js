
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_bank_account', function(t) {
        t.increments('id').primary()
        t.string('account_number').notNullable()
        t.integer('user_id').notNullable()
        t.integer('balance').notNullable()
        t.boolean('active').notNullable()
        t.timestamps(false, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user_bank_account')
};