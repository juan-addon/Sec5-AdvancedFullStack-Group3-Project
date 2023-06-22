const { GraphQLScalarType } = require('graphql');

/*used for creating a custom scalar type date.
Two other methods : parseValue() and parseLiteral() are used to parse strings back to dates.
*/
const GraphQLDate = new GraphQLScalarType({
	name: 'GraphQLDate',
	description: 'A Date() type in GraphQL as a scalar',
	serialize(value) {
		return value.toISOString();
	},
	parseValue(value) {
		const dateValue = new Date(value);
		return isNaN(dateValue) ? undefined : dateValue;
	},
	parseLiteral(ast) {
		const dateValue = new Date(value);
		return isNaN(dateValue) ? undefined : dateValue;
	},
});

module.exports = GraphQLDate;