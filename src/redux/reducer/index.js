import { combineReducers } from 'redux';
import {baseReducer} from "./baseReducer";

const rootReducer = combineReducers({
    baseReducer: baseReducer,
})

export default rootReducer;