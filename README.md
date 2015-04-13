# es7-async
Playing around with ES7 async/await

## Study case
In this study case our program must load 3 resources (json files).  
The requests must to be chained, one after another, logging the output for each request success.  

### Old friend Ajax
First, let's look how we can accomplish the mission with our old friend Ajax.  
The `ajax` function is responsible to create an `xhr` object and execute the callback returning the data.  
No big deal here, we have done this a lot in the past, right?  

```javascript
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
```

### Not so new friend, Promises
`Promises` are around for a while, and now it is part of the ECMAScript 6º edition.  
With `promises` we can kill the pyramid of doom, having a much more cleaner code.  
Check it out:  
```javascript
// Promises
// Wrap the ajax function to return promises
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
```
With promises, we can also have parallel execution easily:  
```javascript
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
```
The fetch API is the new Ajax substitute. We have a lot of new features and a very nice API, promise-based:  
```javascript
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
```

### New powerful friend, generators
Generators basically are functions that can have their execution paused.  
Take a look on what we can do with generators:  
```javascript
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
```

### The new awesome beast, async functions
With async functions, we can `await` on Promises.  
Take a look (awesomeness alert):  
```javascript
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
}());
```
With the fetch API:  
```javascript
(async () => {
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
}());
```
Parallel operations with async:  
```javascript
(async () => {
	let parallelData = await* [
		requestP('data.json'),
		requestP('users.json'),
		requestP('products.json')
	];
	console.log('Async parallel >>>', parallelData);
}());
```

Parallel operations with async + fetch (Oh my god this is great!):  
```javascript
(async () => {
	let parallelDataFetch = await* [
		(await fetch('data.json')).json(),
		(await fetch('users.json')).json(),
		(await fetch('products.json')).json()
	];
	console.log('Async parallel+fetch >>>', parallelDataFetch);
}());
```

## How to run this experiment
```bash
npm install
grunt
```
Serve the dist folder, open the `/sample/index.html` and check it out you dev-tools console.  
