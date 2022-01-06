import React from 'react';
import axios from 'axios';
import { ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentItem = ({ data, getUpdatedList }) => {
	const { id:commentId, comment } = data;
	
	const DeleteComment = async () => {
		await axios.delete(`${process.env.REACT_APP_SERVER}/comment/${commentId}`,{
					withCredentials: true,
					credentials: 'include',
				}).then((res) => {
					getUpdatedList();
				}).catch((err) => {
					console.log(err);
					alert('서버와의 통신 오류가 발생했습니다.');
			});
	};
	
	return (
		<ListItem
		  secondaryAction={
			<IconButton edge="end" onClick={DeleteComment}>
			  <DeleteIcon />
			</IconButton>
		  }
		>
		  <ListItemText
			primary={comment}
		  />
		</ListItem>
	);
};

export default CommentItem;