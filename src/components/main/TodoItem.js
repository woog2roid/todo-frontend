import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap';

const TodoList = () => {
    return (
        <>
            <Card color="primary" outline>
                <CardBody>
                    <CardTitle tag="h5">Card title</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h">
                        Card subtitle
                    </CardSubtitle>
                    <Button color="primary" size="sm" outline>Button</Button>
                </CardBody>
            </Card>
        </>
    );
};

export default TodoList;