import React from 'react';
import { Container } from '@mui/material'; 
import Warning from '../components/common/NotFound';

const NotFound = () => {
	return (
		<Container components="main" maxWidth="xs" sx={{mt: "calc((100vh - 100.5px)*0.4)"}}>
			<Warning />
		</Container>
	);
};

export default NotFound;