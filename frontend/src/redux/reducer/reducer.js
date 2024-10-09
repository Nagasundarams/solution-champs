// src/redux/reducers/todoReducer.js
import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE
} from '../action/action';

const initialState = {
    loading: false,
    todos: [],
    error: '',
    total: 0,
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_REQUEST:
            return { ...state, loading: true };
        case FETCH_TODOS_SUCCESS:
            return {
                loading: false,
                todos: action.payload,
                total: action.total,
                error: '',
            };
        case FETCH_TODOS_FAILURE:
            return { loading: false, todos: [], error: action.payload };
        default:
            return state;
    }
};

export default todoReducer;
