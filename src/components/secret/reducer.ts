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
                loading: true,
                id: action.payload.id || null,
            });
        case SecretAction.ENCRYPTING:
            return Object.assign({}, state, action.payload, {
                loading: true,
                id: action.payload.id || null,
            });
        case SecretAction.ENCRYPT_MESSAGE:
            return Object.assign({}, state, {
                loading: false,
                message: action.payload.message || null,
            });

        case SecretAction.DECRYPT_MESSAGE:
            return Object.assign({}, state, action.payload, {
                loading: false,
                message: action.payload.message || null,
                views: action.payload.views || null
            });

        case SecretAction.ERROR_DECRYPTING:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload.error || null
            });

        case SecretAction.ERROR_ENCRYPTING:
            return Object.assign({}, state, action.payload, {
                loading: false,
                error: action.payload.error || null
            });

        case SecretAction.RESET:
            return Object.assign({}, defaultState)

        default:
            return state;
    }
}