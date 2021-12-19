import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
	<CookiesProvider>
		<BrowserRouter basename="/todo-frontend/">
			<App />
		</BrowserRouter>
	</CookiesProvider>,
	document.getElementById('root')
);