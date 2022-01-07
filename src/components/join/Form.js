import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Button, TextField, Link, Grid, Box } from '@mui/material';

const CheckDetails = styled('div')((props) => ({
	fontSize: '12px',
	marginLeft: '5%',
	color: props.isOk ? 'black' : 'red',
}));

const Form = () => {
	const { authActions } = useContext(AuthContext);
	const navigate = useNavigate();

	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [nickname, setNickname] = useState('');

	const [isIdUnique, setIsIdUnique] = useState(true);
	const [isPwOk, setIsPwOk] = useState(false);
	const [isNicknameUnique, setIsNicknameUnique] = useState(true);

	const onChangeId = async (e) => {
		setId(e.target.value);
	};
	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const onChangeNickname = (e) => {
		setNickname(e.target.value);
	};

	//ID 중복 체크
	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/auth/id`, {
				id: id,
			})
			.then(() => {
				setIsIdUnique(true);
			})
			.catch((err) => {
				setIsIdUnique(false);
			});
	}, [id]);

	//비밀번호 체크
	useEffect(() => {
		const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$/;
		if (regPassword.test(password)) setIsPwOk(true);
		else setIsPwOk(false);
	}, [password]);

	//닉네임 중복 체크
	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_SERVER}/auth/nickname`, {
				nickname: nickname,
			})
			.then(() => {
				setIsNicknameUnique(true);
			})
			.catch((err) => {
				setIsNicknameUnique(false);
			});
	}, [nickname]);

	//회원가입 요청
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!isIdUnique) alert('아이디 중복을 확인해주십시오.');
		else if (!isPwOk) alert('비밀번호를 확인해주십시오.');
		else if (id === '' || nickname === '') alert('아이디와 별명을 입력하세요.');
		else {
			await axios
				.post(
					`${process.env.REACT_APP_SERVER}/auth/join`,
					{
						id: id,
						password: password,
						nickname: nickname,
					},
					{
						withCredentials: true,
						credentials: 'include',
					}
				)
				.then(async (res) => {
					await authActions.setIsAuthed(true);
					await authActions.setUser({
						id: res.data.user.id,
						nickname: res.data.user.nickname,
					});
					navigate('/');
				})
				.catch((err) => {
					alert('회원가입에 실패했습니다. 다시 시도해주세요.');
				});
		}
	};

	return (
		<Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						label="아이디를 입력하세요"
						onChange={onChangeId}
					/>
				</Grid>
				<CheckDetails isOk={isIdUnique}>
					{isIdUnique ? '사용 가능한 아이디입니다.' : '이미 있는 아이디입니다.'}
				</CheckDetails>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						label="비밀번호를 입력하세요"
						type="password"
						onChange={onChangePassword}
					/>
				</Grid>
				<CheckDetails isOk={isPwOk}>
					{isPwOk
						? '사용 가능한 비밀번호입니다.'
						: '5글자 이상, 특수문자와 숫자 영문자를 모두 사용하세요.'}
				</CheckDetails>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						label="별명을 입력하세요"
						onChange={onChangeNickname}
					/>
				</Grid>
				<CheckDetails isOk={isNicknameUnique}>
					{isNicknameUnique ? '사용 가능한 별명입니다.' : '이미 있는 별명입니다.'}
				</CheckDetails>
			</Grid>
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
				회원가입
			</Button>
			<Grid container>
				<Grid item>
					<Link onClick={() => navigate('/login')} variant="body2">
						이미 계정이 있으신가요?
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Form;