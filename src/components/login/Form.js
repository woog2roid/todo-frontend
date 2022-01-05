import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import { Button, TextField, Link, Grid, Box } from '@mui/material';

const Form = () => {
    const { authActions } = useContext(AuthContext);
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const onChangeId = (e) => {
        setId(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (id === '' || password === '') alert('아이디와 비밀번호를 입력하세요');
        else {
            console.log('로그인 요청');
            await axios
                .post(
                    `${process.env.REACT_APP_SERVER}/auth/login`,
                    {
                        id: id,
                        password: password,
                    },
                    {
                        withCredentials: true,
                        credentials: 'include',
                    }
                )
                .then(async (res) => {
                    alert('로그인에 성공하였습니다.');
                    await authActions.setIsAuthed(true);
                    await authActions.setUser({
                        id: res.data.user.id,
                        nickname: res.data.user.nickname,
                    });
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err.response);
                    if (err.response.data.message === 'password not matched')
                        alert('비밀번호를 확인하세요');
                    else if (err.response.data.message === 'id not found')
                        alert('아이디를 확인하세요');
                });
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                label="아이디를 입력하세요"
                autoFocus
                onChange={onChangeId}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="비밀번호를 입력하세요"
                type="password"
                autoComplete="current-password"
                onChange={onChangePassword}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                로그인
            </Button>
            <Grid container>
                <Grid item>
                    <Link onClick={() => navigate('/join')} variant="body2">
                        회원가입
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Form;