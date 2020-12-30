import { combineReducers } from "redux";
import { secretReducer } from "./secret/reducer";

export const reducers =  combineReducers({
    secret: secretReducer
})