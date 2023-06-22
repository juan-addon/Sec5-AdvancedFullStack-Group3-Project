require('dotenv').config();
const express = require('express');
const { dbConnect } = require('../db/db.js');
const { installHandler } = require('../src/api_handler.js');

const app = express();

const port = process.env.API_SERVER_PORT || 4000;

//adding a middleware for serving static files to the Express app
app.use(express.static('public'));

// configure the server
installHandler(app);

(async function () {
	try {
		//establish a connection to the MongoDB database server
		await dbConnect();
		
		//app will start by listening on port 3000
		app.listen(port, function () {
			console.log(`API server started on port ${port}`);
		});
	} catch (err) {
		console.log('ERROR:', err);
	}
}());