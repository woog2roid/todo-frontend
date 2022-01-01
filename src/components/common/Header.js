import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import AuthContext from '../../contexts/AuthContext';
import { Typography } from '@mui/material';

const FlexWrapper = styled('div')({
	display: 'flex',
});
const UserHeaderWrapper = styled(FlexWrapper)(({theme}) =>({
	justifyContent: 'space-between',
	color: theme.palette.error.main,
}));
const VisitorHeaderWrapper = styled(FlexWrapper)(({theme}) => ({
	justifyContent: 'space-between',
	color: theme.palette.primary.main,
}));
const HeaderDetails = styled(Typography)({
	fontSize: '12px',
	fontWeight: 'bold',
	padding: '0 15px 0 15px',
});

const Header = () => {
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
					<HeaderDetails onClick={onClickLogout} variant="subtitle2" >로그아웃</HeaderDetails> 
					<HeaderDetails color="black">{authState.user.nickname}님 환영합니다!</HeaderDetails>
				</UserHeaderWrapper>:
				<VisitorHeaderWrapper>
					<HeaderDetails onClick={onClickLogin}>로그인</HeaderDetails>
					<HeaderDetails onClick={onClickJoin}>회원가입</HeaderDetails>
				</VisitorHeaderWrapper>
			}
		</>
	);
};

export default Header;