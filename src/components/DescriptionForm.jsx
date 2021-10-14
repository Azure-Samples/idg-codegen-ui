import { useContext } from 'react';
import { Form, Button } from "react-bootstrap";

import { SampleContext } from '../App';

export const DescriptionForm = (props) => {

    const sampleContext = useContext(SampleContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        sampleContext.setSample({
            ...sampleContext.sample,
            Sample: {
                Title: e.target.sampleTitle.value,
                Level: e.target.sampleLevel.value,
                Client: e.target.sampleClient.value,
                Service: e.target.sampleService.value,
                Endpoint: e.target.sampleEndpoint.value,
                Provider: e.target.sampleProvider.value,
                RepositoryUrl: e.target.sampleRepositoryUrl.value,
            }
        });
        
        props.handleNext("apps");
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="sampleTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" />
                    <Form.Text className="text-muted">
                        Enter a descriptive title for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="sampleLevel">
                    <Form.Label>Level</Form.Label>
                    <Form.Control as="select" size="lg" custom>
                        <option>100</option>
                        <option>200</option>
                        <option>300</option>
                        <option>400</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Enter a level appropriate for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="sampleClient">
                    <Form.Label>Client</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" />
                    <Form.Text className="text-muted">
                        Enter a descriptive title for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="sampleService">
                    <Form.Label>Service</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" />
                    <Form.Text className="text-muted">
                        Enter a descriptive title for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="sampleRepositoryUrl">
                    <Form.Label>Repository URL</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" />
                    <Form.Text className="text-muted">
                        Enter a descriptive title for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="sampleEndpoint">
                    <Form.Label>Endpoint</Form.Label>
                    <Form.Control as="select" size="lg" custom>
                        <option>v1</option>
                        <option>v2</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Enter a level appropriate for the sample.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="sampleProvider">
                    <Form.Label>Provider</Form.Label>
                    <Form.Control as="select" size="lg" custom>
                        <option>AAD</option>
                        <option>B2C</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Enter a level appropriate for the sample.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
        </>
    );
};