var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
require("console.table");

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
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id + "  " + results[i].product_name);
            }
            return choiceArray;
          },
          message: "What product would you like to buy?\n"
        },
        {
          name: "purchase_quantity",
          type: "input",
          message: "How many would you like to buy?\n"
        }
      ]).then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.choice) {
            chosenItem = results[i];
          }
        }
        console.log(answer.purchase_quantity);
        if (answer.purchase_quantity > chosenItem.stock_quantity) {
          console.log("Insufficient quantity");
          return false;
        } else {
          return true;
        }
      });
  });
}
