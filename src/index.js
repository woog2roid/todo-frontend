import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
	<>
		<BrowserRouter basename="/todo-frontend/">
			<App />
		</BrowserRouter>
	</>,
	document.getElementById('root')
);