import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import { TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTodo = ({ getUpdatedList }) => {
	const { authState } = useContext(AuthContext);
    const [title, setTitle] = useState("");
	const [detail, setDetail] = useState("");
    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
	const onChangeDetail = useCallback((e) => {
		setDetail(e.target.value);
	}, []);

	const addTodo = useCallback(async (e) => {
		e.preventDefault();
		if(authState.isAuthed) {
			await axios.post(`${process.env.REACT_APP_SERVER}/todo`,{
					title,
					detail,
				}, {
					withCredentials: true,
					credentials: 'include',
				}).then((res) => {
					getUpdatedList();
				}).catch((err) => {
					alert('서버와의 통신 오류가 발생했습니다.');
				});
		}
		setTitle("");
		setDetail("");
	}, [title, detail]);

    return (
		<form onSubmit={addTodo}>
			<TextField
				label="할 일을 입력하세요."
				required
				variant="standard"
				margin="dense"
				onChange={onChangeTitle}
				value={title}
				fullWidth
			/>
			<TextField
				label="설명을 입력하세요."
				variant="outlined"
				sx={{ mt: 1, mr: "8px", mb: 1, width: "calc(100% - 80px)"}}
				size="small"
				onChange={onChangeDetail}
				value={detail}
			/>
			<Button type="submit" variant="contained" sx={{ mt: 1, mb: 1, ml: "8px"}}>
				<AddIcon />
			</Button>
		</form>
    );
};

export default AddTodo;