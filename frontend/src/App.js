import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoList from './components/toDoList';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <TodoList />
            </div>
        </Provider>
    );
};

export default App;
