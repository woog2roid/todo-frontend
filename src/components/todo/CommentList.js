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
		const fetchCommentList = async () => {
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
					console.log(err);
				});
		};
		if(authState.isAuthed) fetchCommentList();
	}, [listDeps]);
	
	if(!comments) {
		return <></>;
	} else {
		return (
			<List>
				{
					comments.reverse().map((comment) => {
						return <CommentItem data={comment} getUpdatedList={getUpdatedList}/>;
					})
				}
			</List>
		);
	}
};

export default CommentList;