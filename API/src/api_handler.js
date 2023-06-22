const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const employee = require('./employee.js');

//handler or function that resolve a query provided to a field with its actual values
const resolvers = {
	Query: {
		employeeList: employee.getDBEmployeeList,
		employee: employee.getEmployee
	},
	Mutation: {
		addEmployee: employee.dbAddEmployee,
		updateEmployee: employee.dbUpdateEmployee,
		deleteEmployee: employee.dbDeleteEmployee
	},
	GraphQLDate
}

const server = new ApolloServer({
	/*read the schema.graphql file and when creating the Apollo Server, the value for the property typeDefs is taken
	   from the returned string*/
	typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
	resolvers,
	formatError: error => {
		console.log(error);
		return error;
	}
})

function installHandler(app) {
	server.start().then(res => {
		server.applyMiddleware({ app, path: '/graphql' });
	})
}

module.exports = { installHandler };