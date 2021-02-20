function get_cookie(name) {
    var name = name + "=";
    var decoded = decodeURIComponent(document.cookie);
    var decoded_element = decoded.split(";");
    for(var i = 0; i < decoded_element.length; i++) {
        var result = decoded_element[i];
        while (result.charAt(0) == " ") result = result.substring(1);
        if (result.indexOf(name) == 0) return result.substring(name.length, result.length);
    }
    return "";
}

function set_cookie(name, value, ttl_minutes, path="/", same_site="Lax") {
    var d = new Date();
    d.setTime(d.getTime() + (ttl_minutes*60*1000));
    document.cookie = name+"="+encodeURIComponent(value)+";"+"expires="+d.toUTCString()+";path="+path+";SameSite="+same_site;
}

function get_request_object() {
    var result = undefined;
    if(window.XMLHttpRequest) result = new XMLHttpRequest();
	else if(window.ActiveXObject) {
		try { result = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch(e1) {
			try { result = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch(e2) { return undefined; }
		}		
	}
    return result;
}
     
async function http_request(method, body, path, callback=(r)=>{}, content_type="application/json") {
    const request = get_request_object();
    request.onreadystatechange = () => { if(request.readyState === 4) callback(request.response); }
    request.open(method, path);
    request.setRequestHeader("content-type", content_type);
    request.send(body);
}

function login(username, password, error_text_id) {
    http_request(
        "POST",
        JSON.stringify({username:username, password:password}),
        "/api/login",
        (res) => {
            res = JSON.parse(res);
            if (res["resultCode"] === 0) {
                set_cookie("token", res["token"], 60);
                window.location.href = "/app/";
            } else document.getElementById(error_text_id).innerHTML = "Login fehlgeschlagen!";
        }
    );
}
