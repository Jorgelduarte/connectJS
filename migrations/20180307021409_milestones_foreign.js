
exports.up = function(knex, Promise) {
    return knex.schema.table('milestones', function(table) {
        table.integer('famous_person_id')
        table.foreign('famous_person_id').references('famous_people.id')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('milestones', function(t) {
        table.dropColumn('famous_person_id');
    });
};
