const crypto = require("crypto");

// MD5 hash dari PIN Alice
const targetHash = "5531a5834816222280f20d1ef9e95f69";

// Fungsi untuk menghitung hash MD5
function md5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

// Fungsi brute force untuk menemukan PIN
function bruteForcePin() {
  for (let pin = 0; pin <= 9999; pin++) {
    // Format PIN menjadi 4 digit (contoh: 1 -> "0001")
    const pinStr = pin.toString().padStart(4, "0");

    // Hitung hash MD5 dari PIN
    const hash = md5Hash(pinStr);

    // Periksa apakah hash cocok dengan target
    if (hash === targetHash) {
      return pinStr; // Kembalikan PIN yang cocok
    }
  }
  return null; // Jika tidak ditemukan
}

// Jalankan brute force
console.log("Mencari PIN...");
const foundPin = bruteForcePin();

if (foundPin) {
  console.log(`PIN ditemukan: ${foundPin}`);
} else {
  console.log("PIN tidak ditemukan.");
}
