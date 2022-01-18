import React, { useCallback } from 'react';
import axios from 'axios';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentItem = ({ data, getUpdatedList }) => {
	const { id:commentId, comment } = data;
	
	const DeleteComment = useCallback(async () => {
		await axios.delete(`${process.env.REACT_APP_SERVER}/comment/${commentId}`,{
					withCredentials: true,
					credentials: 'include',
				}).then((res) => {
					getUpdatedList();
				}).catch((err) => {
					alert('서버와의 통신 오류가 발생했습니다.');
			});
	}, [commentId]);
	
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

const arePropsEqual = (prevProps, nextProps) => {
	if(prevProps.data.id !== nextProps.data.id) return false;
	else return true;
}

export default React.memo(CommentItem, arePropsEqual);