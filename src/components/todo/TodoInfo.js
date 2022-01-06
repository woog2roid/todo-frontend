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
		const fetchTodo = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER}/todo/${todoId}`, {
					withCredentials: true,
					credentials: 'include',
				})
				.then((res) => {
					console.log(res.data);
					setTodo(res.data.todo);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		if (authState.isAuthed) fetchTodo();
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