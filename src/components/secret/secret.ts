interface EncryptionDigest {
    digest: string;
    passphrase: string;
}

function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function encrypt(msg: string): EncryptionDigest {
    const passphrase = makeid(10);
    // const digest = CryptoJS.AES.encrypt(msg, passphrase).toString();

    return {
        digest : "",
        passphrase
    }
}
