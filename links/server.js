const http = require('http');
const fs = require('fs');
const  fileName = "List of saved links.txt";

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const textContent = decodeURIComponent(body.replace('textContent=', ''));
            fs.appendFile(fileName, textContent + '\n', (err) => {
                if (err) {
                    console.error('אירעה שגיאה בכתיבת הקובץ:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('אירעה שגיאה בשמירת הקובץ.');
                } else {
                    console.log('File saved successfully');
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File saved successfully!');
                }
            });
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`The server runs on port ${port}`);
});
