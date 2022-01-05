import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from '@mui/material';

const AlreadyAuthed = () => {
	const navigate = useNavigate();
	
	return (
		<>
			<Alert severity="error">이미 로그인 하셨습니다.</Alert>
			<Button
				onClick={() => {
					navigate('/');
				}}
				fullWidth
				variant="contained"
				color="error"
			>
				메인으로 가기
			</Button>
		</>
	);
};

export default AlreadyAuthed;