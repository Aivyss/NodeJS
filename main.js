// 모듈 임포트
var http = require('http');
var fs = require('fs');
var url = require('url'); // url 모듈 사용

var app = http.createServer(function(request,response){
    var _url = request.url; // request.url == 클라이언트가 요청하는 디렉토리 파트
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname; // 쿼리스트링이 없는 실제 디렉토리

    console.log(url.parse(_url, true));

    if (pathName === "/") {
        if (queryData.id === undefined) {
            var title = "Welcome";
            var description = "Hello, Node.js";
            var template = `
                <!doctype html>
                <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        
                        <ol>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                        </ol>
                        
                        <h2>${title}</h2>
                        
                        <p>${description}</p>
                    </body>
                </html>
                `
                response.writeHead(200); // 200 -> 파일을 성공적으로 전송
                response.end(template); // 이 부분에 들어가는 것이 사용자에게 페이지로서 전송됨.
        } else {
            fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) => {
                var title = queryData.id;
                var template = `
                <!doctype html>
                <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        
                        <ol>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                        </ol>
                        
                        <h2>${title}</h2>
                        
                        <p>${description}</p>
                    </body>
                </html>
                `
                response.writeHead(200); // 200 -> 파일을 성공적으로 전송
                response.end(template); // 이 부분에 들어가는 것이 사용자에게 페이지로서 전송됨.
            });
        }
    }else {
        response.writeHead(404); // 404 -> 파일을 찾을 수 없는 경우
        response.end('Not found');
    }

 
});

app.listen(3000); // 서버의 포트번호를 의미한다.