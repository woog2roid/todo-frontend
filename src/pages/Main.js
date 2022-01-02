import React, { useState } from 'react';
import Title from '../components/common/Title';
import Header from '../components/common/Header';
import AddTodo from '../components/main/AddTodo';
import TodoList from '../components/main/TodoList';
import { Box, Container } from '@mui/material'; 

const Main = () => {
	const [listDeps, setListDeps] = useState(0);
	const getUpdatedList = () => {
		setListDeps(listDeps+ 1);
	};
	
	return (
		<Container components="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 2,
					display: 'flex',
					flexDirection: 'column',
				}}
            >
				<Header />
				<Title />
				<AddTodo getUpdatedList={getUpdatedList}/>
				<Box component="div" sx={{ width: '100%', height: 'calc(95vh - 191px)', overflow: 'auto' }}>
					<TodoList listDeps={listDeps} getUpdatedList={getUpdatedList}/>
				</Box>
			</Box>
		</Container>
	);
};

export default Main;