import { SecretActionType } from "./action"

interface SecretState {
    key: string | null;
    message?: string | null;
    id?: string | null;
}

const defaultState = {
    key: null,
    message: null,
    id: null
}

export function secretReducer(state: SecretState = defaultState, action: SecretActionType) {
    return state;
}