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

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducers, composedEnhancer)

export type Dispatcher = typeof store.dispatch;

export default store;