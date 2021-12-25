import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
	<AuthProvider>
		<BrowserRouter basename="/todo-frontend/">
			<App />
		</BrowserRouter>
	</AuthProvider>,
	document.getElementById('root')
);