var prompt = require('prompt');
var mysql = require('mysql');
// This is my own code to style the table in node.js
var TableStyle = require('./TableStyle.js')
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "Atown4real$8", 
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// Display All Items inside Database and sell an item to customer
connection.query('SELECT * FROM Products', function(err, res){
  
  // Error Handler
  if(err) throw err;
  // This is the start of the program that shows the intro to the user. (welcome message)
  console.log('==== Welcome to Louis\'s bamazon.==== \n Please select a product below to start...\n');
  console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
  
  // This is the loop that runs through all the item and displays them
  for(var i = 0; i < res.length; i++){

    // ---------- Add in padding for table ----------
    var itemID = res[i].ItemID + ''; 
    itemID = TableStyle("  ID  ", itemID);

    var productName = res[i].ProductName + ''; // convert to string
    productName = TableStyle("      Product Name      ", productName);

    var departmentName = res[i].DepartmentName + ''; 
    departmentName = TableStyle("  Department Name  ", departmentName);

    var price = '$' + res[i].Price.toFixed(2) + ''; 
    price = TableStyle("   Price  ", price);

    var quantity = res[i].StockQuantity + ''; 

    // Log table entry
    console.log(itemID + '|' + productName + '|' + departmentName + '|' + price + '|    ' + quantity);
  }

 
  prompt.start();

  // Ask for Item ID
  console.log('\nWhat do yo wanna buy?');
  prompt.get(['buyItemID'], function (err, result) {
    
    // Program shows the choice result selection of the user. 
    var buyItemID = result.buyItemID;
    console.log('You chose product ID #'  + buyItemID);

    console.log('\nHow many do you wish to buy?')
    prompt.get(['buyItemQuantity'], function (err, result) {

      // Show quantity selected
      var buyItemQuantity = result.buyItemQuantity;
      console.log('You Have selected to buy ' + buyItemQuantity + ' of these.');

      connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ItemID: buyItemID}], function(err, res){
        if(err) throw err; // Error Handler
       
        if(res[0] == undefined){
          console.log('Sorry... We found no items with Item ID "' +  buyItemID + '"');
          connection.end(); // end the script/connection
        }
        // This are checks to see the quantity that is avaialble in the database. 
        else{
          var bamazonQuantity = res[0].StockQuantity;
          // insufficient inventory
          if(bamazonQuantity >= buyItemQuantity){

            // Update mySQL database with reduced inventory
            var newInventory = parseInt(bamazonQuantity) - parseInt(buyItemQuantity); 
            connection.query('UPDATE Products SET ? WHERE ?', [{StockQuantity: newInventory}, {ItemID: buyItemID}], function(err, res){
              if(err) throw err; // Error Handler
            }); 


            // Shows customer their purchase total 
            var customerTotal;
            connection.query('SELECT Price FROM Products WHERE ?', [{ItemID: buyItemID}], function(err, res){
              
              var buyItemPrice = res[0].Price;
              customerTotal = buyItemQuantity*buyItemPrice.toFixed(2);

              console.log('\nYour total is $' + customerTotal + '.');

            
              connection.query('SELECT DepartmentName FROM Products WHERE ?', [{ItemID: buyItemID}], function(err, res){
                var itemDepartment = res[0].DepartmentName;
                
               
                connection.query('SELECT TotalSales FROM Departments WHERE ?', [{DepartmentName: itemDepartment}], function(err, res){
                  var totalSales = res[0].TotalSales;

                  // Calculate new sale revenue
                  var totalSales = parseFloat(totalSales) + parseFloat(customerTotal);

                 
                  connection.query('UPDATE Departments SET ? WHERE ?', [{TotalSales: totalSales}, {DepartmentName: itemDepartment}], function(err, res){
                    if(err) throw err; // Error Handler
                    console.log('All Right! Your Set and Good To Go. Thank you for Shopping with Louis\'s!')
                    connection.end();
                    // end of the script

                  }); 
      
                }); 

              }); 
            
            });  
          }
          // Low inventory count
          else{
            console.log('Sorry... We only have ' +  bamazonQuantity + ' of those items. Order cancelled.');
            connection.end(); // end the script/connection
          }
        }

      }); 

    }); 

  }); 

}); 