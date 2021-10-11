class kond2 {
    constructor(){//deklarasikan kelas 
        this.pointLapar = Math.floor(
            Math.random()*100
        );
        //deklarasikan point untuk perbandingan pada if di index.js
    }
    segar() {
        console.log('segar sudah tidak haus');
            //hasilprint jika function dijalankan melalui index.js
    }
}

module.exports = kond2 ; //export modul