import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import TodoItem from './TodoItem';

const TodoList = ({ listDeps, getUpdatedList }) => {
	const { authState } = useContext(AuthContext);
	const [todos, setTodos] = useState([
		{
			title: "회원가입/로그인하기",
			detail: "로그인을 하지 않으면 대부분의 기능을 이용할 수 없어요",
			isDone: false,
		}
	]);

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
					alert('서버와의 통신 오류가 발생했습니다.');
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