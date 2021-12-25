import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Text = styled.div`
	font-size: 25px;
	font-weight: bold;
	text-align: center;
`;

const Title = () => {
	const navigate = useNavigate();
	const onClick = () => {
		navigate('/');
	};
	
	return (
		<>
			<Text className="text-primary" onClick={onClick}>
				투두리스트
			</Text>
		</>
	);
};


export default Title;