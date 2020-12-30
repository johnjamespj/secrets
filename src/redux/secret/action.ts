export interface SecretActionType {
    type: SecretAction;
    payload: {
        key?: string | null;
        message?: string | null;
        id?: string | null;
    };
}

export enum SecretAction {
    ENCRYPT_MESSAGE = "secret/encrypt-message",
    DECRYPT_MESSAGE = "secret/decrypt-message",
    ENCRYPTING = "secret/encrypting",
    DECRYPTING = "secret/decrypting"
}

export const encrypting = (): SecretActionType => ({
    payload: {},
    type: SecretAction.ENCRYPTING
})

export const decrypting = () : SecretActionType => ({
    payload: {},
    type: SecretAction.DECRYPTING
})

export const encryptMessage = (key: string, message: string): SecretActionType => {
    //TODO: Encryption
    return {
        type: SecretAction.ENCRYPT_MESSAGE,
        payload: {}
    }
}

export const decryptMessage = (key: string, message: string): SecretActionType => {
    //TODO: Dencryption
    return {
        type: SecretAction.DECRYPT_MESSAGE,
        payload: {}
    }
}