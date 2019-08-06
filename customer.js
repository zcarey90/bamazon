var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "runtest123",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("good connection");
  displayProducts();
});

function displayProducts() {
  var query = "SELECT * from products", function(err, res) {
    if (err) throw err;
    console.log("Welcome to Bamazon");
});

function quantity() {

  var table = new Table({
      head: ['ID', 'Product', 'Department', 'Price', 'Stock'],
      colWidths: [10, 30, 30, 30, 30]
  });

  listQuantity();

  function listQuantity() {

      connection.query("SELECT * FROM products", function(err, res) {
          for (var i = 0; i < res.length; i++) {

              var itemId = res[i].item_id,
                  productName = res[i].product_name,
                  departmentName = res[i].department_name,
                  price = res[i].price,
                  stockQuantity = res[i].stock_quantity;

            table.push(
                [itemId, productName, departmentName, price, stockQuantity]
          );
        }
          console.log("");
          console.log("Inventory");
          console.log("");
          console.log(table.toString());
          continuePrompt();
      });
  }
}

var count = 0;

var askQuestion =  function(){
    if (count < 2){
  inquirer.prompt([{
    {
      type: "input",
      message: "What item would you like to find?",
      name: "product",
      filter: Number
    },{
      type: "input",
      message: "How many would like to purchase?",
      name: "quantity",
      filter: Number
    }]).then(function(answers){
      var customerWants = new Programmer(answers.name,answers.find,
        answers.purchase);
      customerWants.printInfo();
      count++;
      askQuestion();
    })
  } else {
    console.log("Finished shopping");


function purchase(product, quantity) {
  var listQuantity = product.stock_quantity - quantity;
  connection.query(
    [{stock_quantity: listQuantity}, {item_id: product.item_id}],
    function(err, res) {
      console.log();
      displayProducts();
    }
  );
}
askQuestion();

