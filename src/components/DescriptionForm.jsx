import { useContext, useState } from 'react';
import { Form, Button } from "react-bootstrap";

import { SampleContext } from '../App';

export const DescriptionForm = (props) => {

    const sampleContext = useContext(SampleContext);

    const [description, setDescription] = useState({
        Title: "",
        Level: "100", // default
        Client: "",
        Service: "",
        Endpoint: "v2", // default
        Provider: "AAD", // default
        RepositoryUrl: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // update the state
        sampleContext.setSample({
            ...sampleContext.sample,
            Sample: description
        });
        
        // move to the next form
        props.handleNext("apps");
    }

    const handleChange = (e) => {
        setDescription({
            ...description,
            [e.target.id]: e.target.value
        });
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Enter a descriptive title for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Level">
                    <Form.Label>Level</Form.Label>
                    <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange} custom required>
                        <option>100</option>
                        <option>200</option>
                        <option>300</option>
                        <option>400</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Select a level appropriate for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Client">
                    <Form.Label>Client</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        Enter a descriptive title for the client component.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Service">
                    <Form.Label>Service</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        Enter a descriptive title for the service component (if any).
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="RepositoryUrl">
                    <Form.Label>Repository URL</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Enter a descriptive title for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Endpoint">
                    <Form.Label>Endpoint</Form.Label>
                    <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange} custom required>
                        <option>v2</option>
                        <option>v1</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Select the Microsoft identity platform endpoint version.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Provider">
                    <Form.Label>Provider</Form.Label>
                    <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange} custom required>
                        <option>AAD</option>
                        <option>B2C</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Select a provider.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
        </>
    );
};