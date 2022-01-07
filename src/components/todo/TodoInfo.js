import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Card, CardContent, Typography } from '@mui/material';

const Todo = () => {
	const { id: todoId } = useParams();
	const [todo, setTodo] = useState([]);
	const { authState } = useContext(AuthContext);
	
	useEffect(() => {
		const getTodo = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER}/todo/${todoId}`, {
					withCredentials: true,
					credentials: 'include',
				})
				.then((res) => {
					setTodo(res.data.todo);
				})
				.catch((err) => {
					alert('서버와의 통신 오류가 발생했습니다.');
				});
		};
		if (authState.isAuthed) getTodo();
	}, [authState.isAuthed]);

	if (!todo) {
		return <></>;
	} else {
		return (
			<Card variant="outlined" sx={{ width: '98%', mt: 1 }}>
				<CardContent>
					<Typography sx={{ fontSize: 18, fontWeight: "bold", m: 0 }}>
						{todo.title}
					</Typography>
					{
						todo.detail ?
							<Typography color="text.secondary" sx={{ fontSize: 12 }}>
								{todo.detail}
							</Typography>
						: ""
					}
				</CardContent>
			</Card>
		);
	}
};

export default Todo;