exports.up = function(knex, Promise) {
    return knex.schema.createTable('transfer_transation', function(t) {
        t.increments('id').primary()
        t.string('user_account_number').notNullable()
        t.integer('user_id').notNullable()
        t.string('recipient_account_number').notNullable()
        t.integer('recipient_id').notNullable()
        t.integer('amount').notNullable()
        t.string('comment')
        t.string('fee_type').notNullable()
        t.boolean('transfered').notNullable()
        t.timestamps(false, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('transfer_transation')
};