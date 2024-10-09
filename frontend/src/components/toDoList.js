import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure
} from '../redux/action/action';

const TodoList = () => {
    const dispatch = useDispatch();
    const { todos, loading, error, total } = useSelector((state) => state.todos);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputs, setInputs] = useState({
        name: "",
        Esthrs: 0,
        status: "Pending",
        id: null
    });

    useEffect(() => {
        const fetchTodos = async () => {
            dispatch(fetchTodosRequest());
            try {
                const response = await axios.get(`http://localhost:3001/?page=${currentPage}&limit=5`);
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const data = response.data.tasks;
                const total = response.data.totalPages;
                dispatch(fetchTodosSuccess(data, total));
            } catch (error) {
                dispatch(fetchTodosFailure(error.message));
            }
        };
        fetchTodos();
    }, [dispatch, currentPage]);

    const totalPages = total;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const postData = async (e) => {
        e.preventDefault();
        const dataToSend = {
            name: inputs.name,
            EstimatedHrs: inputs.Esthrs,
            Status: inputs.status
        };
    
        try {
            let updatedTodos;
            if (inputs.id) {
                const response = await axios.patch(`http://localhost:3001/${inputs.id}`, dataToSend);
                updatedTodos = todos.map(todo => (todo._id === inputs.id ? response.data.data.tasks : todo)); // Update the edited todo
            } else {
                const response = await axios.post(`http://localhost:3001/`, dataToSend);
                console.log(response.data.data.tasks);
                
                updatedTodos = [...todos, response.data.data.tasks]; // Add the new todo
            }
    
            // Dispatch success action with updated todos
            dispatch(fetchTodosSuccess(updatedTodos, total)); // Assuming `total` remains unchanged
    
        } catch (error) {
            dispatch(fetchTodosFailure(`Error in upd/post: ${error.message}`));
        }
    
        setInputs({ name: "", Esthrs: 0, status: "Pending", id: null });
    };
    

    const handleEditClick = (todo) => {
        setInputs({
            name: todo.name,
            Esthrs: todo.EstimatedHrs,
            status: todo.Status,
            id: todo._id
        });
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/${id}`);
            console.log('Task deleted successfully');

            const updatedTodos = todos.filter(todo => todo._id !== id);
        dispatch(fetchTodosSuccess(updatedTodos, total));
        } catch (error) {
            dispatch(fetchTodosFailure(`Error in delete: ${error.message}`));
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form className='forinput' onSubmit={postData}>
                <label>Task Name</label>
                <input required type='text' name='name' className='inputname' value={inputs.name} onChange={e => setInputs(prev => ({ ...prev, name: e.target.value }))} />
                <label>Estimated Hour of completion</label>
                <input type='number' name='hrs' className='inputhrs' value={inputs.Esthrs} onChange={e => setInputs(prev => ({ ...prev, Esthrs: e.target.value }))} />
                <label>Status</label>
                <select name="cars" id="cars" value={inputs.status} onChange={e => setInputs(prev => ({ ...prev, status: e.target.value }))}>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
                <button className='submitbutton' type='submit'>{inputs.id ? 'Update' : 'Add'}</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className='tasks'>
                {todos.map((todo) => (
                    <div className={todo.Status === "Pending" ? "singleTask" : "singleTaskcompleted"} key={todo._id}>
                        <p>{todo.name}</p>
                        <h5>{todo.EstimatedHrs}</h5>
                        <div className='UDbuttons'>
                            <button className='edit' onClick={() => handleEditClick(todo)}>Edit</button>
                            <button className='delete' onClick={() => handleDeleteClick(todo._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="pagination-info">Page {currentPage} of {totalPages}</span>
                <button className="pagination-button" onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TodoList;
