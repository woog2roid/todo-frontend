import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Title from '../common/Title';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { Button, ButtonGroup } from 'reactstrap';

const MainPage = () => {
	const navigate = useNavigate();
	const [cookies] = useCookies(['jwt_auth']);
	const [user, setUser] = useState("");
	
	const onClickLogout = async () => {
		await axios.post(`${process.env.REACT_APP_SERVER}/user/logout`, {}, {
			withCredentials: true,
			credentials: 'include',
		})
		navigate(0);
	}
	const onClickLogin = () => {
		navigate('/login');
	}
	const onClickJoin = () => {
		navigate('/join');
	}
	
    useEffect(() => {
		const fetchUserData = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER}/user`, {
					withCredentials: true,
					credentials: 'include',
				})
				.then((res) => {
					console.log(res.data.user);
					setUser({
						id: res.data.user.id,
						nickname: res.data.user.nickname,
					});
				})
				.catch((err) => {
					setUser({id: null, nickname: "방문자"});
				});
		}
		
		console.log(cookies.jwt_auth);
		fetchUserData();
    }, []);

    return (
        <>
			<>
				{
					user.id !== null ?
					<Button onClick={onClickLogout} size="sm" color="secondary" outline>로그아웃</Button> :
					<ButtonGroup>
						<Button onClick={onClickLogin} size="sm" color="primary" outline>로그인</Button>
						<Button onClick={onClickJoin} size="sm" color="primary" outline>회원가입</Button>
					</ButtonGroup>
				}
				<Title />
			</>
			<div>
				id는 {user.id} 별명은 {user.nickname}
			</div>
            <AddTodo />
            <TodoList />
        </>
    );
};

export default MainPage;