import { Dispatcher } from "../store"
import { makeid, encrypt, decrypt } from "./secret"

type ThunkFunction = (e: Dispatcher) => {}

export interface SecretActionType {
    type: SecretAction;
    payload: {
        message?: string | null;
        id?: string | null;
        error?: string | null;
        views?: number | null;
        loading: boolean;
    };
}

export enum SecretAction {
    ENCRYPT_MESSAGE = "secret/encrypt-message",
    DECRYPT_MESSAGE = "secret/decrypt-message",
    ENCRYPTING = "secret/encrypting",
    DECRYPTING = "secret/decrypting",
    ERROR_ENCRYPTING = "secret/error-encrypting",
    ERROR_DECRYPTING = "secret/error-decrypting"
}

export const encrypting = (id: string): SecretActionType => ({
    payload: {
        loading: true,
        id,
    },
    type: SecretAction.ENCRYPTING
})

export const encrypted = (message: string): SecretActionType => ({
    type: SecretAction.ENCRYPT_MESSAGE,
    payload: {
        loading: false,
        message,
    }
})

export const decrypted = (message: string, views: number): SecretActionType => ({
    type: SecretAction.DECRYPT_MESSAGE,
    payload: {
        loading: false,
        message,
        views,
    }
})

export const errorDecrypting = (error: string): SecretActionType => ({
    type: SecretAction.ERROR_DECRYPTING,
    payload: {
        loading: false,
        error,
    }
})

export const errorEncrypting = (error: string): SecretActionType => ({
    type: SecretAction.ERROR_ENCRYPTING,
    payload: {
        loading: false,
        error,
    }
})

export const decrypting = (id: string): SecretActionType => ({
    payload: {
        loading: true,
        id,
    },
    type: SecretAction.DECRYPTING
})

export const encryptMessage = (key: string, message: string, vanishMode: boolean): ThunkFunction => {
    return async (dispatch: Dispatcher) => {
        const id = makeid(10)
        dispatch(encrypting(id))

        encrypt(key, id, message, vanishMode)
            .then((d) => {
                dispatch(encrypted(d.digest))
            })
            .catch((e) => {
                dispatch(errorEncrypting(e.toString()))
            })
    }
}

export const decryptMessage = (key: string, salt: string, message: string): ThunkFunction => {
    return async (dispatch: Dispatcher) => {
        dispatch(decrypting(salt + key))

        decrypt(salt + key)
            .then((d) => {
                dispatch(decrypted(d.msg || "", d.view || 0))
            })
            .catch((e) => {
                dispatch(errorDecrypting(e.toString()))
            })
    }
}