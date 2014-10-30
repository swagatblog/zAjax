/*
Author: SWAGAT PARIDA
Custom Ajax Class
This class will be used to handle AJAX calls.
ZScript.Ajax
*/
ZScript ={};

ZScript.Ajax = (function () {
    var _xhr = null;
    var _success = null;
    var _failure = null;
    var _requestType = null;
    var _contentType = null;
    var _data = null;
    var _url = null;

    var send_request = function (url, requestType, contentType, data, success, failure) {
        _success = success;
        _failure = failure;
        _xhr = xMLHttpRequest();
        _data = data;
        _requestType = requestType;
        _url = url;
        process_request();
    };

    var process_request = function () {
        _xhr.onreadystatechange = xhr_onreadystatechangeHandler;
        if (_requestType == "POST" || _requestType == "post") {
            post();
        }
        else { get(); }
    }

    var xhr_onreadystatechangeHandler = function () {
        if (_xhr.readyState < 4) {
            return;
        }
        if (_xhr.status !== 200) {
            _failure(_xhr);
        }
        // success
        if (_xhr.readyState === 4) {
            _success(_xhr);
        }
    };

    var get = function () {
        if (_data != null || _data != undefined)
            _url = _url + '?parameters=' + JSON.stringify(_data);
        _xhr.open('GET', _url);
        _xhr.send(null);
    };

    var post = function () {
        _xhr.open('POST', _url);
        if (_contentType == null || _contentType == undefined) {
            _contentType = 'application/json';
        }
        _xhr.setRequestHeader('Content-Type', _contentType);
        _xhr.send('parameters=' + encodeURIComponent(JSON.stringify(_data)));
    }

    var setHeader = function () {
        if (_contentType == null || _contentType == undefined) {
            _contentType = 'application/json';
        }
        _xhr.setRequestHeader('Content-Type', _contentType);

    }

    var xMLHttpRequest = function () {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        else {
            var versions = ["MSXML2.XmlHttp.5.0",
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0",
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"]

            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    return new ActiveXObject(versions[i]);
                    break;
                }
                catch (e) { }
            } // end for
        }
    }

    return {
        send_request: send_request
    };
})();