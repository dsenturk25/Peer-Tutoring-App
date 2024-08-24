

function serverRequest(url, method, data, callback) {

  if (!url || typeof url != "string" || !method || typeof method != "string" || (method != 'GET' && method != 'POST' && method != 'FORM') || !data || typeof data != "object") {
    return callback({ success: false, error: 'bad_request' });
  }

  const xhr = new XMLHttpRequest();
  xhr.open(method == "FORM" ? "POST" : method, url);

  if (method == 'POST') {

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
  } else if (method == 'FORM') {
    xhr.send(data);
  } else {
    xhr.send();
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status != 200 && xhr.status != 201) {
      return callback({ success: false, error: 'network_error' })
    }
    else if (xhr.readyState == 4 && xhr.responseText) {
      return callback(JSON.parse(xhr.responseText));
    }
  };
}

