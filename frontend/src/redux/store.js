// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import todoReducer from './reducer/reducer';

const rootReducer = combineReducers({
    todos: todoReducer,
});

const store = createStore(rootReducer);

export default store;
