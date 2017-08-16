var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  var salesTotal;

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
  });

function createTable() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.table(results);
  });
}

function start() {
  createTable();
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
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
          console.log(chosenItem);
        }
        
       
        // if (answer.purchase_quantity > parseInt(chosenItem.stock_quantity)) {
        //   console.log("Insufficient quantity");
        //   return false;
        // } else {
        //   var updatedQuantity = parseInt(chosenItem.stock_quantity) - parseInt(answer.purchase_quanitity);
        //   var unitPurchase = parseInt(answer.purchase_quantity) * parseInt(chosenItem.price);
        //   connection.query("UPDATE products SET ? WHERE ?", [
        //     {
        //       stock_quantity: updatedQuantity
        //     },
        //     {
        //       item_id: chosenItem.id
        //     }
        //     ],function(err) {
        //       if (err) throw err;
              
        //       console.log("Your order was placed!");
        //       salesTotal += unitPurchase;
        //       console.log("Your purchase total is: $ " + salesTotal + ".");
        //     });
        // }
      });
  });
}

// choices: function() {
//   var choiceArray = [];
//   for (var i = 0; i < results.length; i++) {
//     choiceArray.push(results[i].item_id + "  " + results[i].product_name);
//   }
//   return choiceArray;
// },