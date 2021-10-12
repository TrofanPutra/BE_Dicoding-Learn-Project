const { nanoid } = require('nanoid');
const books = [];

const tambahBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;
    const id = nanoid(16); // memberikan randomstring untuk bookId
    // melakukan pengecekkan data nama terlebih dahulu 
    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
    } // pengembalian response jika input undefined


    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage);


    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }/// pengecekkan data buku 

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };// deklarasi objeect newBook


    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0; // function untuk menambahkan buku kedalam object newBook

    if (isSuccess) { // jika sudah berhasil di masukkan ke dalam array maka kita berikan response 'berhasil '  
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: { bookId: id, },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}; //function untuk menambahkan buku 

const ambilBuku = (request, h) => {
    const { name, reading, finished } = request.query;


    if (name !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                books: books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())).map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                })),
            },
        });
        response.code(200);
        return response;
    }

    if (reading === '1') {
        if (finished === '1') {
            const response = h.response({
                status: 'success',
                data: {
                    books: books.filter((book) => book.finished === true).map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    })),
                },
            });
            response.code(200);
            return response;
        }
        else if (finished === '0') {
            const response = h.response({
                status: 'success',
                data: {
                    books: books.filter((book) => book.finished === true).map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    })),
                },
            });
            response.code(200);
            return response;
        }
        const response = h.response({
            status: 'success',
            data: {
                books: books.filter((book) => book.reading === true).map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                })),
            },
        });
        response.code(200);
        return response;
    }
    else if(reading === '0') {
        if (finished === '1') {
            const response = h.response({
                status: 'success',
                data: {
                    books: books.filter((book) => book.finished === true).map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    })),
                },
            });
            response.code(200);
            return response;
        }
        else if (finished === '0') {
            const response = h.response({
                status: 'success',
                data: {
                    books: books.filter((book) => book.finished === true).map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    })),
                },
            });
            response.code(200);
            return response;
        }
        const response = h.response({
            status: 'success',
            data: {
                books: books.filter((book) => book.reading === false).map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                })),
            },
        });
        response.code(200);
        return response;
    }



    const response = h.response({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;
}; //function untuk mengambil data semua buku 

const ambilBukuById = (request, h) => {
    const { id } = request.params;
    const book = books.filter((book) => book.id === id)[0];



    if (book !== undefined) {
        return {
            status: 'success',
            data: { book },
        };
    }



    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });


    response.code(404);
    return response;
}; //function untuk mengambil data berdasarkan id nya 

const editBukuById = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;
    const index = books.findIndex((book) => book.id === id);

    if (name === undefined) {
        const response = h.response({
            status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }//function jika nama berstatus undifined alias nama tidak terisi 
    if (pageCount < readPage) {
        const response = h.response({
            status: 'fail', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }// functioon pengecekkan halaman buku 

    if (index !== -1) {
        books[index] = {
            ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading
        };
    }// mengupdate data buku 
    else {
        const response = h.response({
            status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan'
        });
        response.code(404);
        return response;
    }//function untuk memberi respon fail jika tidak sesuai denagn index array books


    const response = h.response({
        status: 'success', message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
};//function untuk Mengedit data Buku Berdasarkan Idnya 

const hapusBukuById = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index < 0) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);

        return response;
    }
    else {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);

        return response;

    }
};//function untuk Menghapus data Buku Berdasarkan Idnya 

module.exports = {
    tambahBook, ambilBuku, ambilBukuById, editBukuById, hapusBukuById
};