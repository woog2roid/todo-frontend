import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
	const [todoData, setTodoData] = useState();
	
	useEffect(() => {
		const fetchTodoList = async () => {
			await axios.get(`${process.env.REACT_APP_SERVER}/todo`, {
				withCredentials: true,
				credentials: 'include',
			})
			.then(res => {
				console.log(res);
				setTodoData(res.data);
			})
			.catch(err => {
				console.log(err);
			})
		}
		fetchTodoList();
	}, []);
	
    return (
		<>
		</>
    );
};

export default TodoList;