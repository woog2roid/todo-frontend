import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Checkbox, Typography, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({todo, getUpdatedList}) => {
	const navigate = useNavigate();
	
	const { id, title, detail, isDone } = todo;
	
	const goTodoPage = () => {
		navigate(`/todo/${id}`);
	};
	const updateTodoStatus = async () => {
		await axios.patch(`${process.env.REACT_APP_SERVER}/todo`,{
					id,
					isDone: !isDone,
				}, {
					withCredentials: true,
					credentials: 'include',
				}).then((res) => {
					getUpdatedList();
				}).catch((err) => {
					console.log(err);
					alert('서버와의 통신 오류가 발생했습니다.');
			});
	};
	const deleteTodo = async () => {
		await axios.delete(`${process.env.REACT_APP_SERVER}/todo/${id}`,{
					withCredentials: true,
					credentials: 'include',
				}).then((res) => {
					getUpdatedList();
				}).catch((err) => {
					console.log(err);
					alert('서버와의 통신 오류가 발생했습니다.');
			});
	};
	
    return (
		<Card variant="outlined" sx={{ width: '98%', boxShadow: 1 }}>
			<CardContent>
				<Typography sx={{ fontSize: 18, fontWeight: "bold", margin: 0 }}>
					{title}
					<Checkbox checked={isDone} onChange={updateTodoStatus} sx={{ margin: 0 }}/>
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

export default TodoItem;