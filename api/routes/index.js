var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// Include config file. Go up from routes, down into config, config.js
var config = require('../config/config');

// include bcrpyt for hasing and checking password
var bcrypt = require('bcrypt-nodejs');
// include rand-token for generating user token
var randToken = require('rand-token')

// set up the connection with options
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
// Actually make the connection
connection.connect();

// router.get('/:something/:something2',(req,res, next)=>{
// 	req.cookies.url = req.body.param.something
// 	next()
// })

router.get('/productlines/get', (req, res)=>{
	const selectQuery = "SELECT * FROM productlines"
	connection.query(selectQuery,(error, results, fields)=>{
		if(error){
			res.json(error)
		}else{
			res.json(results);
		}
	});
});

router.post('/register', (req, res)=>{
	console.log(req.body)

	const name = req.body.name;
	const email = req.body.email;
	const accountType = 'customer';
	const password = bcrypt.hashSync(req.body.password);
	const city = req.body.city;
	const state = req.body.state;
	const salesRep = req.body.salesRep
	const creditLimit = 16000000

	// We want to insert the user into 2 tables: Customers and Users.
	// Users needs the customerNumber from the Customers table.
	// Therefore, we need to insert the user into Customers first...
	// get the ID created by that insert, THEN insert the user into Users.

	// Customers insert query
	var insertIntoCust = "INSERT INTO customers (customerName, city, state, salesRepEmployeeNumber,creditLimit) VALUES (?,?,?,?,?)"
	// Run the query (for now autoset the sales rep to 1337)
	connection.query(insertIntoCust,[name,city,state,1337,creditLimit],(error, results)=>{
		// Get the ID that was used in the customers insert
		const newID = results.insertId
		// Get the current timestamp
		var currTimeStamp = parseInt(Date.now() / 1000);
		// Set up a token for this user. We will give this back to React
		var token = randToken.uid(40);
		// Users insert query
		var insertQuery = "INSERT INTO users (uid,type,password,created,token) VALUES (?,?,?,?,?)";
		// Run the query. Use error2 and results2 because are already used results and error
		
		connection.query(insertQuery,[newID, accountType,password, currTimeStamp, token],(error2,results2)=>{
			if(error2){
				res.json({
					msg: error2
				})
			}else{
				res.json({
					msg: "userInserted",
					token: token
				});
			}
		});
	})


})	

module.exports = router;
