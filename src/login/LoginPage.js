import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Header from '../common/Title';

const LoginPage = () => {
	const navigate = useNavigate();

	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const onChangeId = (e) => {
		setId(e.target.value);
	};
	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};
	
	const onSubmit = async (e) => {
		e.preventDefault();
		if(id === "" || password === "") alert("아디이와 비밀번호를 입력하세요");
		else {
			console.log('로그인 요청');
			await axios.post(`${process.env.REACT_APP_SERVER}/auth/login`, {
					id: id,
					password: password,
				}, {
					withCredentials: true,
					credentials: 'include',
				})
				.then((response) => {
					navigate("/");
				})
				.catch((err) => {
					console.log(err.response);
					if(err.response.data.message === "password not matched") alert("비밀번호를 확인하세요");
					else if(err.response.data.message === "id not found") alert("아이디를 확인하세요");
				});
		}
	};
	
	return (
		<>
			<Header />
			<Form onSubmit={onSubmit}>
				<FormGroup>
					<Label for="id">아이디</Label>
					<Input
						id="id"
						onChange={onChangeId}
						placeholder="아이디를 입력하세요"
						type="id"
					/>
					<Label for="password">비밀번호</Label>
					<Input
						id="pssword"
						onChange={onChangePassword}
						placeholder="비밀번호를 입력하세요"
						type="password"
					/>
				</FormGroup>
				<Button color="primary">로그인</Button>
			</Form>
		</>
	);
};

export default LoginPage;