// src/redux/actions/todoActions.js
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const fetchTodosRequest = () => ({
    type: FETCH_TODOS_REQUEST,
});

export const fetchTodosSuccess = (todos, total) => ({
    type: FETCH_TODOS_SUCCESS,
    payload: todos,
    total,
});

export const fetchTodosFailure = (error) => ({
    type: FETCH_TODOS_FAILURE,
    payload: error,
});
