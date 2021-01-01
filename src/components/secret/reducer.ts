import { SecretAction, SecretActionType } from "./action"

export interface SecretState {
    key: string | null;
    message?: string | null;
    id?: string | null;
    loading: boolean;
}

const defaultState = {
    key: null,
    message: null,
    id: null,
    loading: false
}

export function secretReducer(state: SecretState = defaultState, action: SecretActionType): SecretState {
    switch (action.type) {
        case SecretAction.DECRYPTING:
            return Object.assign({}, state, {
                loading: true
            });
        case SecretAction.ENCRYPTING:
            return Object.assign({}, state, {
                loading: true
            });
        case SecretAction.ENCRYPT_MESSAGE:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        case SecretAction.DECRYPT_MESSAGE:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        default:
            return state;
    }
}