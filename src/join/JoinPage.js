import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Header from '../common/Title';

const CheckDetails = styled.div`
	font-size: 12px;
	color: ${props => props.isOk ? "black" : "red"};
`

const JoinPage = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState();
    const [nickname, setNickname] = useState("");
	
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
		axios.post(`${process.env.REACT_APP_SERVER}/user/checkId`, {
				id: id,
			})
			.then(() => {
				setIsIdUnique(true);
			})
			.catch((err) => {
				setIsIdUnique(false);
			});
	},[id]);
	
	//비밀번호 체크
	useEffect(() => {
		const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$/;
		if(regPassword.test(password)) setIsPwOk(true);
		else setIsPwOk(false);
	}, [password]);
	
	//닉네임 중복 체크
	useEffect(() => {
		axios.post(`${process.env.REACT_APP_SERVER}/user/checkNickname`, {
				nickname: nickname,
			})
			.then(() => {
				setIsNicknameUnique(true);
			})
			.catch((err) => {
				setIsNicknameUnique(false);
			});
	},[nickname]);

	//회원가입 요청
    const onSubmit = async (e) => {
		e.preventDefault();
		if(!isIdUnique) alert('아이디 중복을 확인해주십시오.');
		else if(!isPwOk) alert('비밀번호를 확인해주십시오.');
		else if(id === "" || nickname === "") alert('아이디와 별명을 입력하세요.');
		else {
			console.log('회원가입 요청');
			await axios.post(`${process.env.REACT_APP_SERVER}/user/join`, {
					id: id,
					password: password,
					nickname: nickname,
				})
				.then(() => {
					alert('회원가입에 성공하였습니다.');
					navigate("/login");
				})
				.catch((err) => {
					alert('회원가입에 실패했습니다. 다시 시도해주세요.');
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
                    <CheckDetails isOk={isIdUnique}>
                        {isIdUnique ? '사용 가능한 아이디입니다.' : '이미 있는 아이디입니다.'}
                    </CheckDetails>
                    <Label for="password">비밀번호</Label>
                    <Input
                        id="password"
                        onChange={onChangePassword}
                        placeholder="비밀번호를 입력하세요"
                        type="password"
                    />
					<CheckDetails isOk={isPwOk}>
                        {isPwOk ? '사용 가능한 비밀번호입니다.' : '5글자 이상, 특수문자와 숫자 영문자를 모두 사용하세요.'}
                    </CheckDetails>
                    <Label for="nickname">별명</Label>
                    <Input
                        id="nickname"
                        onChange={onChangeNickname}
                        placeholder="별명을 입력하세요"
                        type="nickname"
                    />
					<CheckDetails isOk={isNicknameUnique}>
                        {isNicknameUnique ? '사용 가능한 별명입니다.' : '이미 있는 별명입니다.'}
                    </CheckDetails>
                </FormGroup>
                <Button color="primary">회원가입</Button>
            </Form>
        </>
    );
};

export default JoinPage;