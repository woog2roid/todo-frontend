import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Todo from './pages/Todo';
import NotFound from './pages/NotFound';

const App = () => {
	const { authActions } = useContext(AuthContext);

	//처음 앱 실행 시, 인증상태 확인
    useEffect(() => {
		const checkUserAuth = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER}/user`, {
					withCredentials: true,
					credentials: 'include',
				})
				.then((res) => {
					authActions.setUser({
						id: res.data.user.id,
						nickname: res.data.user.nickname,
					});
					authActions.setIsAuthed(true);
				})
				.catch((err) => {
					authActions.setIsAuthed(false);
					authActions.setUser({id: null, nickname: null});
				});
		}
		checkUserAuth();
    }, []);
	
    return (
		<Routes>
			<Route path='/' element={<Main/>} />
			<Route path='/login' element={<Login/>} />
			<Route path='/join' element={<Join/>} />
			<Route path='/todo/:id' element={<Todo/>} />
			<Route path='/*' element={<NotFound/>} />
		</Routes>
	);
}

export default App;