//for start use npm run start //

const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');

    const { method, url } = request;

    if (url === '/') { // penentu alamat website 
        if (method === 'GET') { // jika menggunakan method GET maka data yang akan di kembalikan seperti di bawah ini 
            response.statusCode = 200; //response status 200 maka berhasil di akses 
            response.end('<h1>Selamat Datang pada HomePage</h1>');
        } else { // jika menggunakan method selain GET maka data yang akan di kembalikan seperti di bawah ini 
            response.statusCode = 400; // response status 400 maka tidak berhasil di askses 
            response.end(`<h1>Halaman ini tidak dapat diakses dengan Method ${method} request</h1>`);
        }
    } else if (url === '/page') { // penentu alamat jika masuk di halaman "page"
        if (method === 'GET') { 
            response.statusCode = 200;
            response.end('<h1>Halo! Ini adalah halaman page</h1>')
        } else if (method === 'POST') { // jika menggunakan method POST maka data yang akan di post akan di olah seperti di bawah ini 
            let body = [];

            request.on('data', (chunk) => { // meminta data dari client
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString(); //data yang di ambil akan masuk ke dalam const "name"
                const { name } = JSON.parse(body); //data di pindahkan kedalam 'name'
                response.statusCode = 200;
                response.end(`<h1>Halo, ${name}! Ini adalah halaman page</h1>`); // hasil data yang di kembalikan untuk pengembalian method 
            });
        } else {
            response.statusCode = 400;
            response.end(`<h1>Halaman ini tidak dapat diakses dengan Method ${method} request</h1>`); // jika client menggunakan method selain GET dan POST maka data yang akan diterima akan menjadi seperti ini 
        }
    } else {
        response.statusCode = 400;
        response.end('<h1>Halaman tidak ditemukan!</h1>'); // jika client memasukkan halaman diluar dari "/" dan "/page"
    }
};



const server = http.createServer(requestListener);

const port = 5000; // port hosting 
const host = 'localhost'; //alamat website 

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});



