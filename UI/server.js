require('dotenv').config();
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
//adding a middleware for serving static files to the Express app
app.use(express.static('public'));

// Declare a constant variable named "apiProxyTarget" and assign its value to the environment variable "API_PROXY_TARGET"
const apiProxyTarget = process.env.API_PROXY_TARGET;

if (apiProxyTarget) {
	/* 
		If "apiProxyTarget" exists, add a middleware to the Express app to proxy any requests 
		to '/graphql' to the "apiProxyTarget" URL
	*/
	app.use('/graphql', proxy({ target: apiProxyTarget }));
}

const port = process.env.UI_SERVER_PORT || 8081;

//app will start by listening on port 8081
app.listen(port, function () {
	console.log(`UI server started on the port: ${port}`);
});