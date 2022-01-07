import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import AuthContext from '../../contexts/AuthContext';
import { Typography } from '@mui/material';

const HeaderWrapper = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
});
const HeaderDetails = styled(Typography)({
	fontSize: '12px',
	fontWeight: 'bold',
	padding: '0 15px 0 15px',
});

const Header = () => {
	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();

	const goLoginPage = () => {
		navigate('/login');
	};
	const goJoinPage = () => {
		navigate('/join');
	};
	const logout = async () => {
		await axios.post(
			`${process.env.REACT_APP_SERVER}/auth/logout`,
			{},
			{
				withCredentials: true,
				credentials: 'include',
			}
		);
		await navigate('/');
		await navigate(0);
	};
	
	return (
		<>
			{authState.isAuthed === true ? (
				<HeaderWrapper>
					<HeaderDetails onClick={logout} variant="subtitle2" color="error.main">
						로그아웃
					</HeaderDetails>
					<HeaderDetails color="black">
						{authState.user.nickname}님 환영합니다!
					</HeaderDetails>
				</HeaderWrapper>
			) : (
				<HeaderWrapper>
					<HeaderDetails onClick={goLoginPage} color="primary.main">
						로그인
					</HeaderDetails>
					<HeaderDetails onClick={goJoinPage} color="primary.main">
						회원가입
					</HeaderDetails>
				</HeaderWrapper>
			)}
		</>
	);
};
	
export default Header;