import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
	<ThemeProvider theme={createTheme()}>
	<AuthProvider>
		<BrowserRouter basename="/todo-frontend/">
			<App />
		</BrowserRouter>
	</AuthProvider>
	</ThemeProvider>,
	document.getElementById('root')
);