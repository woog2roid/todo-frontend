import React from 'react';
import Title from '../components/common/Title';
import JoinForm from '../components/join/Form';
import { Box, Container } from '@mui/material'; 

const Join = () => {
	return (
		<Container components="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
            >
				<Title />
				<JoinForm />
			</Box>
		</Container>
	);
};

export default Join;