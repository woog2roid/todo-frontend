import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';

const App = () => {
    return (
		<Routes>
			<Route path='/' element={<Main/>} />
			<Route path='/login' element={<Login/>} />
			<Route path='join' element={<Join/>} />
		</Routes>
	);
}

export default App;