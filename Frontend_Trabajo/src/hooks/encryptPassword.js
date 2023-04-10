import CryptoJS from 'crypto-js';

const encryptPassword = (password) => {
    const wordArray = CryptoJS.enc.Utf8.parse(password); // Convierte la contraseña a un objeto WordArray
    const hash = CryptoJS.SHA256(wordArray); // Realiza el hash SHA256
    return hash.toString(CryptoJS.enc.Hex); // Convierte el resultado a una cadena hexadecimal
};

export default encryptPassword;