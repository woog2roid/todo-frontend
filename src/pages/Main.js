import React from 'react';
import Title from '../components/common/Title';
import Header from '../components/common/Header';
import AddTodo from '../components/main/AddTodo';
import TodoList from '../components/main/TodoList';
import { Box, Container } from '@mui/material'; 

const Login = () => {
	return (
		<Container components="main" maxWidth="md">
			<Box
				sx={{
					marginTop: 2,
					display: 'flex',
					flexDirection: 'column',
				}}
            >
				<Header />
				<Title />
				<AddTodo />
				<TodoList />
			</Box>
		</Container>
	);
};

export default Login;