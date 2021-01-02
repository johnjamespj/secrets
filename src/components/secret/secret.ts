import { API } from 'aws-amplify'
import CryptoJS from 'crypto-js'

interface EncryptionDigest {
    digest: string;
    hash: string;
}

interface APIResponse {
    error: string | null;
    msg: string | null;
    view: number | null;
}

const API_NAME = "scrtapi"
const PATH = "/secret"

function HASH(str: string) {
    return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex)
}

export function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function encrypt(key: string, id: string, msg: string, vanishMode: boolean): Promise<EncryptionDigest> {
    const digest = CryptoJS.AES.encrypt(msg, id + key).toString();
    const hash = HASH(id + key)

    try {
        const param = {
            body: {
                id: hash,
                msg: digest,
                vanishMode
            }
        }

        await API.post(API_NAME, PATH, param)
        return {
            digest,
            hash
        }
    } catch (e) {
        throw e
    }
}

interface DecrptionDigest {
    view: number | null;
    msg: string | null;
}

export async function decrypt(passphrase: string): Promise<DecrptionDigest> {
    const id = HASH(passphrase)

    try {
        const res = (await API.get(API_NAME, PATH + '/' + id, {})) as APIResponse
        return {
            msg: CryptoJS.AES.decrypt(res.msg || "", passphrase).toString(CryptoJS.enc.Utf8),
            view: res.view
        }
    } catch (e) {
        throw e;
    }
}