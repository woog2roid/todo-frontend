import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import NotAuthed from '../components/common/NotAuthed';
import Title from '../components/common/Title';
import Header from '../components/common/Header';
import Todo from '../components/todo/Todo';
import AddComment from '../components/todo/AddComment';
import CommentList from '../components/todo/CommentList';
import { Box, Container } from '@mui/material'; 

const Main = () => {
	const { authState } = useContext(AuthContext);
	
	if(!authState.isAuthed) {
		return (
			<Container components="main" maxWidth="xs" sx={{mt: "calc((100vh - 100.5px)*0.4)"}}>
				<NotAuthed />
			</Container>
		);
	} else {
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
					<Todo />
					<AddComment />
					<CommentList />
				</Box>
			</Container>
		);
	}
};

export default Main;