import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { List } from '@mui/material';
import { useParams } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import CommentItem from './CommentItem';

const CommentList = ({ listDeps, getUpdatedList }) => {
	const [comments, setComments] = useState();
	const { authState } = useContext(AuthContext);
	const { id:todoId } = useParams();

	useEffect(() => {
		const getComments = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER}/comment`, {
					withCredentials: true,
					credentials: 'include',
					params: {
						todo: todoId,
					},
				})
				.then((res) => {
					setComments(res.data.comments);
				})
				.catch((err) => {
					alert('서버와의 통신 오류가 발생했습니다.');
				});
		};
		if(authState.isAuthed) getComments();
	}, [listDeps]);
	
	if(!comments) {
		return <></>;
	} else {
		return (
			<List>
				{
					comments.map((comment) => {
						return <CommentItem key={comment.id} data={comment} getUpdatedList={getUpdatedList}/>;
					})
				}
			</List>
		);
	}
};

export default CommentList;