import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { combineReducers } from "redux";
import { secretReducer, SecretState } from "./secret/reducer"

export interface StateType {
    secret: SecretState
}

export const reducers = combineReducers<StateType>({
    secret: secretReducer
})

const middleware = [
    thunkMiddleware
]

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

export type Dispatcher = typeof store.dispatch;

export default store;