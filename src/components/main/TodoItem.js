import React from 'react';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';

const TodoItem = ({todo}) => {
	const { title, detail, isDone } = todo;
	
    return (
		<Card variant="outlined" sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
					{title}
				</Typography>
				{
					detail ?
						<Typography color="text.secondary" sx={{ fontSize: 15 }}>
							{detail}
						</Typography>
					: ""
				}
				<CardActions>
					<Button size="small">진행사항</Button>
				</CardActions>
			</CardContent>
		</Card>
    );
};

export default TodoItem;