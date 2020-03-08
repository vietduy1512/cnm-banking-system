
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_refresh_token_ext', function(t) {
        t.increments('user_id').primary()
        t.string('refresh_token').notNullable()
        t.timestamps(false, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user_refresh_token_ext')
};
