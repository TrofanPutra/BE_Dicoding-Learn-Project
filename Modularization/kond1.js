class kond1 { //deklarasikan kelas 
  constructor() {
    this.pointLapar = Math.floor(Math.random() * 100); //deklarasikan point untuk perbandingan pada if di index.js
  }
  kenyang() {
    console.log(' makan');
    //hasilprint jika function dijalankan melalui index.js
  }
}
module.exports = kond1; //export modul
