import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Title from '../common/Title';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { Button, ButtonGroup } from 'reactstrap';
import AuthContext from '../../contexts/AuthContext';

const FlexWrapper = styled.div`
	display: flex;
`;
const UserHeaderWrapper = styled(FlexWrapper)`
	justify-content: space-between;
`;
const VisitorHeaderWrapper = styled(FlexWrapper)`
	justify-content: flex-end;
`;
const HeaderDetails = styled.div`
	font-size: 12px;
	font-weight: bold;
	padding: 0 15px 0 15px;
`;

const MainPage = () => {
	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();
	
	const onClickLogout = async () => {
		await axios.post(`${process.env.REACT_APP_SERVER}/auth/logout`, {}, {
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
	
    return (
        <>
			{
				authState.isAuthed === true ?
				<UserHeaderWrapper>
					<HeaderDetails onClick={onClickLogout} className="text-danger">로그아웃</HeaderDetails> 
					<HeaderDetails>{authState.user.nickname}님 환영합니다!</HeaderDetails>
				</UserHeaderWrapper>:
				<VisitorHeaderWrapper>
					<HeaderDetails onClick={onClickLogin} className="text-success">로그인</HeaderDetails>
					<HeaderDetails onClick={onClickJoin} className="text-success">회원가입</HeaderDetails>
				</VisitorHeaderWrapper>
			}
			<Title />
            <AddTodo />
            <TodoList />
			{authState.isAuthed ===  true ? "" : <HeaderDetails>로그인이 안된 상태에서는 리스트를 저장할 수 없어요!</HeaderDetails>}
        </>
    );
};

export default MainPage;