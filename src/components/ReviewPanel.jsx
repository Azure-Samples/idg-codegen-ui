import { useContext } from 'react';
import { Form, Button } from "react-bootstrap";

import { SampleContext } from '../App';

export const ReviewPanel = () => {

    const sampleContext = useContext(SampleContext);

    return (
        <>
            <Form>
                <Button
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(sampleContext.sample, null, '\t')
                    )}`}
                    download="sample.json"
                    variant="primary" type="submit"
                >
                    Submit
                </Button>
            </Form>
        </>
    );
};