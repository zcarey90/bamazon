var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("good connection");
});

listQuantity();

function listQuantity() {
  console.log("Welcome to Bamazon");
  connection.query("SELECT * FROM products", function(err, res) {
    console.log(res);
    var table = new Table({
      head: ["ID", "Product", "Department", "Price", "Stock"],
      colWidths: [10, 30, 30, 30, 30]
    });
    for (var i = 0; i < res.length; i++) {
      var itemId = res[i].id;
      var productName = res[i].product_name;
      var departmentName = res[i].department_name;
      var price = res[i].price;
      var stockQuantity = res[i].stock_quantity;

      table.push([itemId, productName, departmentName, price, stockQuantity]);
      // console.log(table);
    }
    console.log("");
    console.log("Inventory");
    console.log("");
    console.log(table.toString());
    askQuestion();
  });
}

var count = 0;

var askQuestion = function() {
  if (count < 2) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What item would you like to find?",
          name: "product",
          filter: Number
        },
        {
          type: "input",
          message: "How many would like to purchase?",
          name: "quantity",
          filter: Number
        }
      ])
      .then(function(answers) {
        console.log(answers);
        answers.quantity, answers.product;
        connection.query(
          "SELECT * FROM products WHERE id=?",
          [answers.product],
          function(err, res) {
            var updatedStock = res[0].stock_quantity - answers.quantity;
            console.log(updatedStock);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [{ stock_quantity: updatedStock }, { id: answers.product }],
              function(err, res) {
                listQuantity();
                askQuestion();
              }
            );
          }
        );
      });
  }
};
