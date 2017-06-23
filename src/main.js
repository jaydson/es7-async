// Not using ES6 imports here due to an issue with Babel and regenerator
require('./core');
require('./fetch');
let ajax = require('./ajax');

// Callbacks with Ajax

// Getting data
ajax('data.json', (data) => {
	console.log('AJAX/data >>>', JSON.parse(data));

	// Getting users
	ajax('users.json', (users) => {
		console.log('AJAX/users >>>', JSON.parse(users));

		// Getting products
		ajax('products.json', (products) => {
			console.log('AJAX/products >>>', JSON.parse(products));
		});
	});
});

// Promises
function requestP(url) {
	return new Promise(function(resolve, reject) {
		ajax(url, (response) => {
			resolve(JSON.parse(response));
		});
	});
}

// Getting data
requestP('data.json')
.then(function(data){
	console.log('Promises/data >>>', data);
});

// Getting users
requestP('users.json')
.then(function(users){
	console.log('Promises/users >>>', users);
});

// Getting products
requestP('products.json')
.then(function(products){
	console.log('Promises/products >>>', products);
});

// Parallel operations with promises
// Getting data, users and products
Promise.all([
	requestP('data.json'),
	requestP('users.json'),
	requestP('products.json')
])
.then(function(data) {
	console.log('Parallel promises >>>', data);
});

// Promises with the fetch API
// Getting data
fetch('data.json')
.then(function(data) {
	return data.json();
})
.then(function(data) {
	console.log('Promises+fetch/data >>>', data);
});

// Getting users
fetch('users.json')
.then(function(data) {
	return data.json();
})
.then(function(users) {
	console.log('Promises+fetch/users >>>', users);
});

// Getting products
fetch('products.json')
.then(function(data){
	return data.json();
})
.then(function(products) {
	console.log('Promises+fetch/products >>>', products);
});

// Generators
function request(url) {
	ajax(url, (response) => {
		iterator.next(JSON.parse(response));
	});
}

function *main() {
	// Getting data
	let data = yield request('data.json');

	// Getting users
	let users = yield request('users.json');

	// Getting products
	let products = yield request('products.json');

	console.log('Generator/data >>>', data);
	console.log('Generator/users >>>', users);
	console.log('Generator/products >>>', products);
}

var iterator = main();
iterator.next();

// ES7 async/await
(async () => {

	// Getting data
	let data = await requestP('data.json');

	// Getting users
	let users = await requestP('users.json');

	// Getting products
	let products = await requestP('products.json');

	console.log('ES7 Async/data >>>', data);
	console.log('ES7 Async/users >>>', users);
	console.log('ES7 Async/products >>>', products);

	// Async/await using the fetch API
	try {

		// Getting data
		let data = await fetch('data.json');

		// Parsing data
		let parsedData = await data.json();

		// Getting users
		let users = await fetch('users.json');

		// Parsing users
		let parsedUsers = await users.json();

		// Getting products
		let products = await fetch('products.json');

		// Parsing products
		let parsedProducts = await products.json();


		console.log('ES7 Async+fetch/data >>>', parsedData);
		console.log('ES7 Async+fetch/users >>>', parsedUsers);
		console.log('ES7 Async+fetch/products >>>', parsedProducts);

		
	} catch (error) {
		console.log(error);
	}

	// Parallel operations with async
	let parallelData = await Promise.all([
		requestP('data.json'),
		requestP('users.json'),
		requestP('products.json')
	]);
	console.log('Async parallel >>>', parallelData);

	// Parallel operations with async + fetch
	let parallelDataFetch = await Promise.all([
		(await fetch('data.json')).json(),
		(await fetch('users.json')).json(),
		(await fetch('products.json')).json()
	]);
	console.log('Async parallel+fetch >>>', parallelDataFetch);

}());