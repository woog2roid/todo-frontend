import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AlreadyAuthed from '../components/common/AlreadyAuthed';
import Title from '../components/common/Title';
import LoginForm from '../components/login/Form';
import { Box, Container } from '@mui/material'; 

const Login = () => {
	const { authState } = useContext(AuthContext);
	
	if(authState.isAuthed) {
		return (
			<Container components="main" maxWidth="xs" sx={{mt: "calc((100vh - 100.5px)*0.4)"}}>
				<AlreadyAuthed />
			</Container>
		);
	} else {
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
	}
};

export default Login;