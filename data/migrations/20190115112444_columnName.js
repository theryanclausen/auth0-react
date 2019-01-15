exports.up = function(knex, Promise) {
  return knex.schema.table("family", tbl => {
    tbl.renameColumn("name", "family_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("family", tbl => {
    tbl.renameColumn("name", "family_name");
  });
};
