import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Main from './main/MainPage';
import Login from './login/LoginPage';
import Join from './join/JoinPage';

const App = () => {
	const [user, setUser] = useState("");
	const { authState, authActions } = useContext(AuthContext);

	//앱 처음 시작 시, 로그인이 되어있는지 확인함
    useEffect(() => {
		const fetchUserData = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER}/user`, {
					withCredentials: true,
					credentials: 'include',
				})
				.then((res) => {
					console.log(res.data.user);
					authActions.setIsAuthed(true);
					authActions.setUser({
						id: res.data.user.id,
						nickname: res.data.user.nickname,
					});
				})
				.catch((err) => {
					//authActions.setIsAuthed(false);
					authActions.setUser({id: null, nickname: "방문자"});
				});
		}
		fetchUserData();
    }, []);

    return (
		<Routes>
			<Route path='/' element={<Main/>} />
			<Route path='/login' element={<Login/>} />
			<Route path='join' element={<Join/>} />
		</Routes>
	);
}

export default App;