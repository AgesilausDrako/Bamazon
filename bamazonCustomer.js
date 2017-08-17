var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    createTable();
    buyProduct();
  });

function createTable() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.table(results);
  });
}

function buyProduct() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What is the product you would like to buy?\n"
        },
        {
          name: "purchase_quantity",
          type: "input",
          message: "How many units would you like to buy?\n",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ]).then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
            // console.log(chosenItem);
          }
        }
        
        if (answer.purchase_quantity > chosenItem.stock_quantity) {
          console.log("Insufficient quantity");
          return false;
        } else {
          var updatedQuantity = chosenItem.stock_quantity - answer.purchase_quantity;
          // console.log(updatedQuantity);
          var unitPurchase = answer.purchase_quantity * chosenItem.price;
          // console.log(unitPurchase);
          connection.query("UPDATE products SET ? WHERE ?", [
            {
              stock_quantity: updatedQuantity
            },
            {
              item_id: chosenItem.item_id
            }
          ],function(err) {
              if (err) throw err;
              console.log("Your order was placed!");
              console.log("Your purchase total for " + answer.purchase_quantity + " units of " + 
              chosenItem.product_name + " is: $" + unitPurchase + ".");
              createTable();
              buyProduct();
            });
        }
      });
  });
}
