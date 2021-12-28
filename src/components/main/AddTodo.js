import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
	const [title, setTitle] = useState("");
	
	const onChange = (e) => {
		setTitle(e.target.value);
	}
	const onSubmit = async () => {
		
	}
	
	return (
		<>
		</>
	);
};

export default AddTodo;