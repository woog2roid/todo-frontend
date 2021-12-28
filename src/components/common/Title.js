import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Text = styled('div')(({theme}) => ({
	fontSize: '25px',
	fontWeight: 'bold',
	textAlign: 'center',
	color: theme.palette.primary.main,
}));

const Title = () => {
	const navigate = useNavigate();
	
	const onClick = () => {
		navigate('/');
	};
	
	return (
		<Text onClick={onClick}>
			투두리스트
		</Text>
	);
};

export default Title;