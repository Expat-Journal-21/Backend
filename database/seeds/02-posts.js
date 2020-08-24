
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {title: 'Seeded Title', description: "Seeded Description", images: ["some images", "some images"], user_id: 1,},
        {title: 'Seeded Title', description: "Seeded Description", images: ["some images", "some images"], user_id: 2,}
      ]);
    });
};
