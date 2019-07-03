const website = 'https://api.tfl.gov.uk';
//const website = 'https://rest.coinapi.io';

export function fetchGetData(url, successFunc, errorFunc) {
	fetch(`${website}/${url}`, {
		method: 'GET',
		// headers: {
		// 	'Accept': 'application/json',
		// 	'Content-Type': 'application/json'
		// }
	})
	.then(response => response.json())
	.then(r => successFunc(r))
	.catch(error => errorFunc(error));
}