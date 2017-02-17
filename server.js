//获取所有来自请求的数据，然后将这些数据给应用层处理
var http = require('http');
var url = require('url');

function start(route, handle) {
	function onRequest(req, res) {
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, res, req)
	}

	//http.createServer只有一个function参数，返回一个http.Server实例
	http.createServer(onRequest).listen(8888);
	console.log("Server has started")
}

exports.start = start;

