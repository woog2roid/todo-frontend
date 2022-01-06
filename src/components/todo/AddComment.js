import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddComment = ({ getUpdatedList }) => {
	const { id:todoId } = useParams();
	const [comment, setComment] = useState("");
	const onChangeComment = (e) => {
		setComment(e.target.value);
	};
	
	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post(`${process.env.REACT_APP_SERVER}/comment`,{
				comment,
				todo: todoId,
			}, {
				withCredentials: true,
				credentials: 'include',
			}).then((res) => {
				getUpdatedList();
			}).catch((err) => {
				console.log(err);
				alert('서버와의 통신 오류가 발생했습니다.');
			});
		setComment("");
	};
	
	return (
		<form onSubmit={onSubmit}>
			<TextField
				label="추가사항을 입력하세요."
				variant="outlined"
				sx={{ mt: 1, mr: "8px", mb: 1, width: "calc(100% - 80px)"}}
				size="small"
				onChange={onChangeComment}
				value={comment}
			/>
			<Button type="submit" variant="contained" sx={{ mt: 1, mb: 1, ml: "8px"}}>
				<AddIcon />
			</Button>
		</form>
	);
};

export default AddComment;