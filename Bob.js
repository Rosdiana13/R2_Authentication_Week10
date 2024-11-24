const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");

// MD5 hash dari kata sandi Bob
const targetHash = "578ed5a4eecf5a15803abdc49f6152d6";

// Fungsi untuk menghitung hash MD5
function md5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

// Fungsi untuk melakukan dictionary attack
async function dictionaryAttack(dictionaryFile) {
  const fileStream = fs.createReadStream(dictionaryFile);
  
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const word of rl) {
    const hash = md5Hash(word.trim());
    if (hash === targetHash) {
      return word; // Mengembalikan kata sandi jika ditemukan
    }
  }
  return null; // Jika tidak ditemukan
}

// Jalankan dictionary attack
const dictionaryFile = "500-worst-passwords.txt"; // Nama file kamus (unduh dari repositori GitHub)
console.log("Mencari kata sandi...");
dictionaryAttack(dictionaryFile).then((password) => {
  if (password) {
    console.log(`Kata sandi ditemukan: ${password}`);
  } else {
    console.log("Kata sandi tidak ditemukan.");
  }
}).catch((error) => {
  console.error(`Terjadi kesalahan: ${error.message}`);
});
