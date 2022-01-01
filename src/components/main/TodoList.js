import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import TodoItem from './TodoItem';

const TodoList = () => {
	const [todos, setTodos] = useState();
	const { authState } = useContext(AuthContext);
	
	useEffect(() => {
		const fetchTodoList = async () => {
			await axios.get(`${process.env.REACT_APP_SERVER}/todo`, {
				withCredentials: true,
				credentials: 'include',
			})
			.then(res => {
				console.log(res);
				setTodos(res.data.todos);
			})
			.catch(err => {
				console.log(err);
			})
		};
		if(authState.isAuthed) fetchTodoList();
		else console.log("vfdvfd");
	}, [authState.isAuthed]);
	
	if(!todos) {
		return(<></>);
	} else {
		return (
			<>
				{
					todos.reverse().map((todo, index) => {
						return (<TodoItem key={index} todo={todo}/>);
					})
				}
			</>
		);
	} 
};

export default TodoList;