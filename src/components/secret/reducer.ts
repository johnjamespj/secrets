import { SecretAction, SecretActionType } from "./action"

export interface SecretState {
    message: string | null;
    id: string | null;
    views: number | null;
    loading: boolean;
    error: string | null;
}

const defaultState = {
    message: null,
    id: null,
    error: null,
    views: null,
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

        case SecretAction.ERROR_DECRYPTING:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        case SecretAction.ERROR_ENCRYPTING:
            return Object.assign({}, state, action.payload, {
                loading: false
            });

        default:
            return state;
    }
}