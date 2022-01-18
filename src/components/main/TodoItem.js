import React, { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import { Card, CardContent, Checkbox, Typography, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({todo, getUpdatedList}) => {
	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();
	
	const { id, title, detail, isDone } = todo;
	
	const goTodoPage = () => {
		navigate(`/todo/${id}`);
	};
	const toggleTodo = useCallback(async () => {
		if(authState.isAuthed) {
			await axios.patch(`${process.env.REACT_APP_SERVER}/todo`,{
						id,
						isDone: !isDone,
					}, {
						withCredentials: true,
						credentials: 'include',
					}).then((res) => {
						getUpdatedList();
					}).catch((err) => {
						alert('서버와의 통신 오류가 발생했습니다.');
				});
		}
	}, [isDone]);
	const deleteTodo = useCallback(async () => {
		if(authState.isAuthed) {
			await axios.delete(`${process.env.REACT_APP_SERVER}/todo/${id}`,{
						withCredentials: true,
						credentials: 'include',
					}).then((res) => {
						getUpdatedList();
					}).catch((err) => {
						alert('서버와의 통신 오류가 발생했습니다.');
				});
		}
	}, [id]);
	
    return (
		<Card variant="outlined" sx={{ width: '98%', boxShadow: 1 }}>
			<CardContent>
				<Typography sx={{ fontSize: 18, fontWeight: "bold", margin: 0 }}>
					{title}
					<Checkbox checked={isDone} onChange={toggleTodo} sx={{ margin: 0 }}/>
					<DeleteIcon onClick={deleteTodo} sx={{mb: "-8px"}}/>
				</Typography>
				{
					detail ?
						<Typography color="text.secondary" sx={{ fontSize: 15 }}>
							{detail}
						</Typography>
					: ""
				}
				<Link sx={{ fontSize: 13, color: 'primary.main' }}  onClick={goTodoPage}>
					더 보기
				</Link>
			</CardContent>
		</Card>
    );
};

const arePropsEqual = (prevProps, nextProps) => {
	if(prevProps.todo.id !== nextProps.todo.id) return false;
	else if(prevProps.todo.isDone !== nextProps.todo.isDone) return false;
	else return true;
};

export default React.memo(TodoItem, arePropsEqual);