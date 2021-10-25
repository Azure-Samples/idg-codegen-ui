import { useContext, useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";

import { SampleContext } from '../App';

export const ConfigurationForm = (props) => {

    const sampleContext = useContext(SampleContext);
    const [configs, setConfigs] = useState([]);
    const configForm = []; // array of form elements

    // initialize the mappings object on component load
    useEffect(() => {
        const configs = [];

        for (const app of sampleContext.sample.AADApps) {
            configs.push({
                App: app.Id,
                SettingKind: "JSON", // default
                SettingFile: "",
                Mappings: []
            });
        }

        setConfigs(configs);

    }, [sampleContext.sample.AADApps]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // update the state
        sampleContext.setSample({
            ...sampleContext.sample,
            CodeConfiguration: configs,
        });

        // move to the next form
        props.handleNext("review");
    }

    const addMappings = (appIndex) => {
        const newConfigs = [...configs];
        newConfigs[appIndex]["Mappings"].push({});
        setConfigs(newConfigs);
    }

    const handleChange = (appIndex, sectionIndex) => (e) => {
        if (isNaN(e.target.id.split("-")[1])) {
            const newConfigs = [...configs];
            newConfigs[appIndex][e.target.id.split("-")[0]][sectionIndex][e.target.id.split("-")[1]] = e.target.value;
            setConfigs(newConfigs);
        } else {
            const newConfigs = [...configs];
            newConfigs[appIndex][e.target.id.split("-")[0]] = e.target.value;
            setConfigs(newConfigs);
        }
    }

    for (let i = 0; i < sampleContext.sample.AADApps.length; i++) {
        configForm.push(
            <div id={"config-" + i} key={"config-" + i}>
                <Form.Group className="mb-3" controlId={"App-" + i} >
                    <Form.Label>Id</Form.Label>
                    <Form.Control 
                        type="text" 
                        defaultValue={sampleContext.sample.AADApps[i]["Id"]}
                        onChange={handleChange(i)}
                        disabled
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId={"SettingKind-" + i} >
                    <Form.Label>Setting Kind</Form.Label>
                    <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange(i)} custom>
                        <option>JSON</option>
                        <option>Text</option>
                        <option>Replace</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Enter the kind of the setting file replace method.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"SettingFile-" + i}>
                    <Form.Label>Setting File</Form.Label>
                    <Form.Control type="text" placeholder="Enter the path" onChange={handleChange(i)} required />
                    <Form.Text className="text-muted">
                        Enter the path to the setting file, relative to the location of this file.
                    </Form.Text>
                </Form.Group>
                { configs[i] && configs[i].Mappings.length > 0 ? configs[i].Mappings.map((mapping, index) => {
                    return (
                        <div iid={"Mappings-" + index} key={"Mappings-" + index}>
                            <Form.Group className="mb-3" controlId={"Mappings-key"}>
                                <Form.Label>key</Form.Label>
                                <Form.Control type="text" placeholder="enter the key" onChange={handleChange(i, index)} />
                                <Form.Text className="text-muted">
                                    Enter a JSON key or text blob to replace.
                                </Form.Text>
                            </Form.Group>
            
                            <Form.Group className="mb-3" controlId={"Mappings-value"}>
                                <Form.Label>value</Form.Label>
                                <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange(i, index)} custom>
                                    <option>.AppId</option>
                                    <option>.AppKey</option>
                                    <option>.HomePage</option>
                                    <option>.Scope</option>
                                    <option>.ReplyUrls</option>
                                    <option>$tenantId</option>
                                    <option>$tenantName</option>
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    Enter the kind of the setting file replace method.
                                </Form.Text>
                            </Form.Group>
                        </div>
                    );
                }) : null }
                <Button variant="primary" onClick={() => addMappings(i)}>
                    Add a mapping
                </Button>
                <hr />
            </div>
        );
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
            {configForm}
            {
                configForm.length > 0 ?
                    <Button variant="primary" type="submit">
                        Finish
                    </Button>
                :
                    null
            }
            </Form>
        </>
    );
};