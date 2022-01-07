import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import NotAuthed from '../components/common/NotAuthed';
import Title from '../components/common/Title';
import Header from '../components/common/Header';
import TodoInfo from '../components/todo/TodoInfo';
import AddComment from '../components/todo/AddComment';
import CommentList from '../components/todo/CommentList';
import { Box, Container } from '@mui/material'; 

const Main = () => {
	const { authState } = useContext(AuthContext);
	
	const [listDeps, setListDeps] = useState(0);
	const getUpdatedList = () => {
		setListDeps(listDeps+ 1);
	};
	
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
						mt: 2,
						mb: 2,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Header />
					<Title />
					<TodoInfo />
					<Box
						component="div"
						sx={{
							mt: '3px',
							width: '98%',
							height: 'calc(98vh - 235px)',
							overflow: 'auto',
						}}
					>
						<CommentList listDeps={listDeps} getUpdatedList={getUpdatedList}/>
					</Box>
					<AddComment getUpdatedList={getUpdatedList}/>
				</Box>
			</Container>
		);
	}
};

export default Main;