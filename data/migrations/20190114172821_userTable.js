exports.up = function(knex, Promise) {
    return knex.schema.createTable('userTable', tbl =>{
        tbl.increments()
        tbl.string('name', 128).notNullable()
        tbl.string('email', 128).notNullable()
        tbl.string('test',125)
        tbl.boolean('isAdmin').defaultTo(false)
        tbl.integer('family_id').references('family.id').notNullable()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('userTable')
  };
  