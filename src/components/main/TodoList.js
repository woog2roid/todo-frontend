import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import TodoItem from './TodoItem';

const TodoList = ({ listDeps, getUpdatedList }) => {
	const { authState } = useContext(AuthContext);
	const [todos, setTodos] = useState();

	useEffect(() => {
		const getTodos = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER}/todo`, {
					withCredentials: true,
					credentials: 'include',
				})
				.then((res) => {
					setTodos(res.data.todos);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		if(authState.isAuthed) getTodos();
	}, [authState.isAuthed, listDeps]);

	if (!todos) {
		return <></>;
	} else {
		return (
			<>
				{
					todos.filter((data) => {
						return data.isDone === false;
					})
					.reverse()
					.map((todo) => {
						return <TodoItem key={todo.id} todo={todo} getUpdatedList={getUpdatedList} />;
					})
				}
				{
					todos.filter((data) => {
						return data.isDone === true;
					})
					.reverse()
					.map((todo) => {
						return <TodoItem key={todo.id} todo={todo} getUpdatedList={getUpdatedList} />;
					})
				}
			</>
		);
	}
};

export default TodoList;