const Sequelize = require("sequelize");
const sequelize = new Sequelize("expense-table", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
