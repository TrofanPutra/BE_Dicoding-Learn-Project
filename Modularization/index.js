const kond1 = require('./kond1');
const kond2 = require('./kond2');
//import class dari luar index.js

const lapar = (kond1a, kond2a) => { //deklarasi function untuk perbandingan antara nilai pertama dan kedua 
    if (kond1a.pointLapar > kond2a.pointLapar) {
        kond1a.kenyang();
        return;
        //kondisi pertama jika math.random dari kond1 lebih besar maka akan menjalankan function kenyang();
    }
    if (kond1a.pointLapar < kond2a.pointLapar) {
        kond2a.segar();
        return;
        //kondisi kedua jika math.random dari kond2 lebih besar maka akan menjalankan function segar();
    }
    console.log('Butuh makan dan minum');
    //kondisi default jika dua kondisi di atas tidak berhasil jalan
}

const kond1a = new kond1();
const kond2a = new kond2();
//deklarasi nilai dengan mengambil nilai dari dua function yang sudah ada untuk di masukkan ke variable 

lapar(kond1a, kond2a);
//penggunaan function yang sudah di buat untuk membanding kan data yang mana lebih besar 