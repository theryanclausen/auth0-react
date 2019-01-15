exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("userTable")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("userTable").insert([
        {
          name: "Bert Sample",
          email:
            "fake@email.com"
        }
      ]);
    });
};
