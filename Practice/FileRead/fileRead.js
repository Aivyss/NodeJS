const fs = require('fs'); // fs는 파일시스템을 의미함
fs.readFile('sample.txt', 'utf8', (err, data) => {
    console.log(data);
});
