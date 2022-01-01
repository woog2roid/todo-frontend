import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTodo = () => {
	const navigate = useNavigate();
	
    const [title, setTitle] = useState();
	const [detail, setDetail] = useState();
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
	const onChangeDetail = (e) => {
		setDetail(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post(`${process.env.REACT_APP_SERVER}/todo`,{
					title,
					detail,
				}, {
					withCredentials: true,
					credentials: 'include',
				}).then((res) => {
					navigate(0);
				}).catch((err) => {
					console.log(err);
					alert('서버와의 통신 오류가 발생했습니다.');
			});
	};

    return (
		<form onSubmit={onSubmit}>
			<TextField
				label="할 일을 입력하세요."
				required
				variant="standard"
				margin="dense"
				onChange={onChangeTitle}
				fullWidth="true"
			/>
			<TextField
				label="설명을 입력하세요."
				variant="outlined"
				sx={{ mt: 1, mr: "8px", mb: 1, width: "calc(100% - 80px)"}}
				size="small"
				onChange={onChangeDetail}
			/>
			<Button type="submit" variant="contained" sx={{ mt: 1, mb: 1, ml: "8px"}}>
				<AddIcon />
			</Button>
		</form>
    );
};

export default AddTodo;