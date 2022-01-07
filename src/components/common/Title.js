import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Title = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate('/');
	};
	
	return (
		<Typography 
			onClick={goHome}
			sx={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center', color: 'primary.main'}}
		>
			투두리스트
		</Typography>
	);
};

export default Title;