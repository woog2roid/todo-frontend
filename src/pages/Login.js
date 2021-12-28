import React from 'react';
import Title from '../components/common/Title';
import LoginForm from '../components/login/Form';
import { Box, Container } from '@mui/material'; 

const Login = () => {
	return (
		<Container components="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 10,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
            >
				<Title />
				<LoginForm />
			</Box>
		</Container>
	);
};

export default Login;