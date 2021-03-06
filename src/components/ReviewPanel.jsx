import { useContext, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";

import { SampleContext } from '../App';

export const ReviewPanel = (props) => {

    const sampleContext = useContext(SampleContext);

    const validateFields = (sample) => {

        const sanitizeFields = (object) => JSON.parse(JSON.stringify(object), (key, value) => {
            if (value === null || value === "" || value === [] || value === {} || value === "None") return undefined;
            if (value === "true") return true;
            if (value === "false") return false;
            return value;
        });

        const newSample = {
            Sample: sanitizeFields(sample.Sample),
            AADApps: sample.AADApps.map(app => sanitizeFields(app)),
            CodeConfiguration: sample.CodeConfiguration.map(config => sanitizeFields(config)),
        };

        return newSample;
    }
    
    useEffect(() => {
        const validatedFields = validateFields(sampleContext.sample);
        sampleContext.setSample(validatedFields);

    }, []);

    const printJson = (data) => (
        <div id="review-panel">
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );

    const resetForm = () => {
        sampleContext.setSample({
            Sample: {},
            AADApps: [],
            CodeConfiguration: [],
        });

        // move to the next form
        props.handleNext("description");
    }

    return (
        <>
            {printJson(sampleContext.sample)}
            <Form>
                <Button
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(sampleContext.sample, null, '\t')
                    )}`}
                    download="sample.json"
                    variant="primary" type="submit"
                >
                    Download as JSON
                </Button>
                <Button onClick={resetForm}>
                    Reset
                </Button>
            </Form>
        </>
    );
};