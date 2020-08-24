exports.seed = function (knex) {
  // Inserts seed entries
  return knex("users").insert([
    {
      
      username: "Test User",
      name: "Test Name",
      email: "testtest123@gmail.com",
      password: "$2a$10$wLZigWhkOHB4yY6z8ttbl.ZDqxyibXT.6gwPZjSVrI22Td6rhahJ.",
    },
    {
      username: "Test User2",
      name: "Test Name",
      email: "testtest1234@gmail.com",
      password: "$2a$10$STbN81osX5xRXOmRYWZOfucuTcWVnQe/IXy/wURUX3OCBm301wm3W",
    },
  ]);
};
