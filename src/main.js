require('./core');
require('./fetch');

async function get() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('ok');
		}, Math.ceil(Math.random() * 3000));
	});
}

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