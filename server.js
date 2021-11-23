const http = require ('https');
const app = require('./app');
const path = require('path')
const fs = require('fs')
const port = 3000;
const sever = http.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app);
sever.listen(port);