// konfigurasi disimpan terpusat di file
// supaya semua kode yang membutuhkan konfigurasi ini memiliki data yang seragam

const JWT_SECRET = "secret";
const ROLEKEY_SECRET = "authadmin";

module.exports = {
  JWT_SECRET,
  ROLEKEY_SECRET,
};
