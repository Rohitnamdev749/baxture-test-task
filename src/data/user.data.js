const { v4: uuid } = require("uuid");

const users = [
  {id: uuid(), username: "John", age: 28, hobbies: ["Reading", "Gaming"] },
  {id: uuid(), username: "Smith", age: 25, hobbies: ["Hiking", "Cooking"] },
  {id: uuid(), username: "Alice", age: 23, hobbies: ["Painting", "Running"] },
];

module.exports = users;