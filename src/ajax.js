function ajax(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if(xhr.readyState < 4 || xhr.status !== 200) {
            return new Error('Something bad happened');
        }

        if(xhr.readyState === 4 && typeof callback === 'function') {
            callback(xhr.response);
        }
    };
     
    xhr.open('GET', url, true);
    xhr.send('');
}

module.exports = ajax;