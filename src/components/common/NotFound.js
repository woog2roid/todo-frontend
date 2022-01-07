import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from '@mui/material';

const NotFound = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate('/');
	};
	
	return (
		<>
			<Alert severity="error">존재하지 않는 페이지입니다.</Alert>
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

export default NotFound;