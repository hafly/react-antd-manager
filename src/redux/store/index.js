/**
 * 引入createStore创建Store
 */

import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk'

const rootStore = createStore(reducer, applyMiddleware(thunk));
export default rootStore;