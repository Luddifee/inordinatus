function get_request_object() {
    var result = undefined;
    if(window.XMLHttpRequest) result = new XMLHttpRequest();
	else if(window.ActiveXObject) {
		try { result = new ActiveXObject('Msxml2.XMLHTTP'); }
		catch(e1) {
			try { result = new ActiveXObject('Microsoft.XMLHTTP'); }
            catch(e2) { return undefined; }
		}		
	}
    return result;
}

function http_request(method, body, path, callback) {
    const request = get_request_object();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) callback(request.response);
    }
    request.open(method, 'http://'+window.location.hostname+path);
    request.setRequestHeader('content-type', 'application/json');
    request.send(JSON.stringify(body));
}