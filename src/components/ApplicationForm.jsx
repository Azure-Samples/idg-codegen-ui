import { useContext, useState } from 'react';
import { Form, Button } from "react-bootstrap";

import { SampleContext } from '../App';

export const ApplicationForm = (props) => {

    const sampleContext = useContext(SampleContext);

    const [apps, setApps] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        sampleContext.setSample({
            ...sampleContext.sample,
            AADApps: {
                Title: e.target.sampleTitle.value,
                Level: e.target.sampleLevel.value,
                Client: e.target.sampleClient.value,
                Service: e.target.sampleService.value,
                Endpoint: e.target.sampleEndpoint.value,
                Provider: e.target.sampleProvider.value,
                RepositoryUrl: e.target.sampleRepositoryUrl.value,
            }
        });
        
        props.handleNext("config");
    }

    const addApplication = (e) => {
        setApps(apps + 1);
    }

    const appForm = [];

    for (let i = 0; i < apps; i++) {
        appForm.push(
            <div key={i}>
                <Form.Group className="mb-3" controlId="appId">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" placeholder="Enter an Id" />
                    <Form.Text className="text-muted">
                        Enter a descriptive id for the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="appName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter a name" />
                    <Form.Text className="text-muted">
                        Enter a descriptive name for the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="appKind">
                    <Form.Label>Kind</Form.Label>
                    <Form.Control as="select" size="lg" custom>
                        <option>WebApp</option>
                        <option>WebApi</option>
                        <option>Desktop</option>
                        <option>SinglePageApplication</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Enter the kind of the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="appAudience">
                    <Form.Label>Audience</Form.Label>
                    <Form.Control as="select" size="lg" custom>
                        <option>MyOrg</option>
                        <option>AnyOrg</option>
                        <option>AnyOrgAndPersonal</option>
                        <option>Personal</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Enter the audience of the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="appHomePage">
                    <Form.Label>Homepage</Form.Label>
                    <Form.Control type="text" placeholder="Enter the homepage (if any)" />
                    <Form.Text className="text-muted">
                        Enter the homepage of the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="appReplyUrls">
                    <Form.Label>ReplyUrl</Form.Label>
                    <Form.Control type="text" placeholder="Enter the reply url (if any)" />
                    <Form.Text className="text-muted">
                        Enter the reply url of the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="appLogoutUrl">
                    <Form.Label>LogoutUrl</Form.Label>
                    <Form.Control type="text" placeholder="Enter the logout url (if any)" />
                    <Form.Text className="text-muted">
                        Enter the logout url of the application.
                    </Form.Text>
                </Form.Group>
            </div>
        )
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {appForm}
                <Button variant="primary" onClick={addApplication}>
                    Add Application
                </Button>
                <br />
                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
        </>
    );
};