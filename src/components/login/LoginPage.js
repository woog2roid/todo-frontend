import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import Header from '../common/Title';
import {
    Alert,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {
    const { authState, authActions } = useContext(AuthContext);
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
                .then((res) => {
					alert('로그인에 성공하였습니다.');
					authActions.setIsAuthed(true);
					authActions.setUser({
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

    if (authState.isAuthed === true) {
        return (
            <Container component="main" maxWidth="xs">
                <Alert severity="error">이미 로그인 하셨습니다.</Alert>
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, mb: 2 }}
                >
                    뒤로 가기
                </Button>
            </Container>
        );
    } else {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
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
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    비밀번호를 잊으셨나요?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        );
    }
};

export default LoginPage;