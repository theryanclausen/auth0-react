exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("family")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("family").insert([
        {
          family_name: "Sample",
        }
      ]);
    });
};
