import * as React from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import MainContents from '../components/join/JoinPage';

const Join = () => {
	const { authState, authActions } = React.useContext(AuthContext);

    React.useEffect(() => {
		const checkUserAuth = async () => {
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
					authActions.setIsAuthed(false);
					authActions.setUser({id: null, nickname: null});
				});
		}
		checkUserAuth();
    }, []);
	
	return (
		<MainContents />
	);
};

export default Join;