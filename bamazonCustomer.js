var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
  });

function appInit() {
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
                choiceArray.push(results[i].item_id);
              }
              return choiceArray;
            },
            message: "What product would you like to buy?"
          },
          {
            name: "buy",
            type: "input",
            message: "How many would you like to purchase?"
          }
        ]).then(function(answer) {
          console.log(answer);
        });
  });
}

appInit();