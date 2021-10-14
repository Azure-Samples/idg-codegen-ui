import { useContext } from 'react';
import { Form, Button } from "react-bootstrap";

import { SampleContext } from '../App';

export const ConfigurationForm = (props) => {

    const sampleContext = useContext(SampleContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleNext("review");
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
        </>
    );
};