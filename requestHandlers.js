var exec = require("child_process").exec;
var querystring = require("querystring");
var formidable = require("formidable"); //解析上传文件或数据插件
var fs = require("fs");

function start(res) {
	// body...
	console.log("Request handler 'start' was called.");

	//exec("ping www.baidu.com", function (error, stdout, stderr) {

	var html = '<html>' + 
		'<head>' + 
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" method="post" enctype="multipart/form-data">' +
		'<input type="file" name="upload" value="upload" mutiple="multiple" />' +
		'<input type="submit" value="Upload File" />'
		'</form>' +
		'</body>' +
		'</html>';
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
}

function upload(res, req) {
	// body...
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm(); //创建Formidable.IncomingForm对象
	console.log("about to parse");
	form.parse(req, function(error, fields, files) {
		console.log("parsing done");
		console.log("fields: \n" + fields);
		console.log("files: \n" + files);
		fs.renameSync(files.upload.path, "tmp/surprise.jpg");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write("received image:<br/>");
		res.write("<img src='/show' />");
		res.end();
	})
}

function show(res) {
	console.log("Request handler 'show' was called.");
	fs.readFile("tmp/surprise.jpg", "binary", function(error, file) {
		if(error) {
			res.writeHead(500, {"Content-Type": "text/html"});
			res.write(error + "\n");
			res.end();
		} else {
			res.writeHead(200, {"Content-Type": "image/jpeg"});
			res.write(file, "binary");
			res.end();
		}
	});
}
exports.start = start;
exports.upload = upload;
exports.show = show;