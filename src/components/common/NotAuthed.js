import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from '@mui/material';

const NotAuthed = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate('/');
	};
	
	return (
		<>
			<Alert severity="error">로그인한 회원만 접근가능합니다.</Alert>
			<Button
				onClick={goHome}
				fullWidth
				variant="contained"
				color="error"
			>
				메인으로 가기
			</Button>
		</>
	);
};

export default NotAuthed;