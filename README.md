# es7-async
Playing around with ES7 async/await

```javascript
(async () => {

	try {
		let response = await fetch('data.json');
		if (response.status >= 200 && response.status < 300) {
			let data = await response.json();
			console.log(data);
		}
	} catch (error) {
		console.log(error);
	}

}());
```
