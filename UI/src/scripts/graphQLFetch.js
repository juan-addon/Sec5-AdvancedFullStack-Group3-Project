const regexPatternForDate = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

//function that matches if the input is date-like format and translate them into date pattern
function jsonDateParser(key, value) {
	if (regexPatternForDate.test(value)) return new Date(value);
	return value;
}

//utility function that handles API calls in the GraphQL server and if any errors are found, it reports them
export default async function fetchGraphQL(query, variables = {}) {
	try {
		const graphQLFetchResponse = await fetch('https://real-pink-rattlesnake-shoe.cyclic.app/graphql', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query, variables })
		});

		const body = await graphQLFetchResponse.text();
		const parsedResult = JSON.parse(body, jsonDateParser);

		if (parsedResult.errors) {
			const error = parsedResult.errors[0];
			
			if (error.extensions.code == 'BAD_USER_INPUT') {
				const details = error.extensions.exception.errors.join('\n ');
				alert(`${error.message}:\n ${details}`);
			} else {
				alert(`${error.extensions.code}: ${error.message}`);
			}
		}

		return parsedResult.data;
	} catch (e) {
		alert(`Error in sending data to the GraphQL server: ${e.message}`);
	}
}