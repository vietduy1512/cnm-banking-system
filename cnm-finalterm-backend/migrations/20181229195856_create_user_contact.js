exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_contact', function(t) {
        t.increments('id').primary()
        t.integer('user_id').notNullable()
        t.string('recipient_account_number').notNullable()
        t.string('recipient_name').notNullable()
        t.timestamps(false, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user_contact')
};