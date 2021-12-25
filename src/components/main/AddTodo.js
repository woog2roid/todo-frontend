import React, { useState } from 'react';
import { Form, Input } from 'reactstrap';

const AddTodo = () => {
	const [title, setTitle] = useState("");
	
	const onChange = (e) => {
		setTitle(e.target.value);
	}
	const onSubmit = () => {
		
	}
	
	return (
		<Form onSubmit={onSubmit}>
			<Input onChange={onChange} bsSize="sm" placeholder="할 일을 입력하세요."/>
		</Form>
	);
};

export default AddTodo;