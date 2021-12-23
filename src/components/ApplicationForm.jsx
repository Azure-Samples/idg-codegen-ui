import { useContext, useState } from 'react';
import { Form, Button } from "react-bootstrap";

import { SampleContext } from '../App';

export const ApplicationForm = (props) => {

    const sampleContext = useContext(SampleContext);
    const [apps, setApps] = useState([]); // number of apps submitted
    const appForm = []; // array of form elements

    const handleSubmit = (e) => {
        e.preventDefault();

        // update the state
        sampleContext.setSample({
            ...sampleContext.sample,
            AADApps: apps,
        });

        // move to the next form
        props.handleNext("readme");
    }

    const addApplication = () => {
        setApps([
            ...apps,
            {
                Id: "",
                Name: "",
                Kind: "WebApp", // default
                Audience: "AzureADMyOrg", // default
                HomePage: "",
                ReplyUrls: "",
                LogoutUrl: "",
                PasswordCredentials: "None", // default
                GroupMembershipClaims: "None", // default
                UsesROPCOrIWA: false, // default
                AllowImplicitFlow: false, // default
                RequiredResourcesAccess: [],
                SecurityGroups: [],
                AppRoles: [],
                ManualSteps: []
            }
        ]);
    }

    const addNewStep = (appIndex, propertyName) => {
        const newApps = [...apps];
        newApps[appIndex][propertyName].push({});
        setApps(newApps);
    }

    const handleChange = (appIndex, sectionIndex) => (e) => {
        if (isNaN(e.target.id.split("-")[1])) {
            const newApps = [...apps];
            newApps[appIndex][e.target.id.split("-")[0]][sectionIndex][e.target.id.split("-")[1]] = e.target.value;
            setApps(newApps);
        } else {
            const newApps = [...apps];
            newApps[appIndex][e.target.id.split("-")[0]] = e.target.value;
            setApps(newApps);
        }
    }

    for (let i = 0; i < apps.length; i++) {
        appForm.push(
            <div id={"app-" + i} key={"app-" + i}>
                <Form.Group className="mb-3" controlId={"Id-" + i}>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" placeholder="Enter an Id" onChange={handleChange(i)} required/>
                    <Form.Text className="text-muted">
                        Enter a descriptive id for the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"Name-" + i}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter a name" onChange={handleChange(i)} required/>
                    <Form.Text className="text-muted">
                        Enter a descriptive name for the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"Kind-" + i}>
                    <Form.Label>Kind</Form.Label>
                    <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange(i)} custom>
                        <option>WebApp</option>
                        <option>WebApi</option>
                        <option>Desktop</option>
                        <option>SinglePageApplication</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Select the kind of the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"Audience-" + i}>
                    <Form.Label>Audience</Form.Label>
                    <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange(i)} custom>
                        <option>AzureADMyOrg</option>
                        <option>AzureADMultipleOrgs</option>
                        <option>AzureADandPersonalMicrosoftAccount</option>
                        <option>PersonalMicrosoftAccount</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Select the audience of the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"HomePage-" + i}>
                    <Form.Label>Homepage</Form.Label>
                    <Form.Control type="text" placeholder="Enter the homepage (if any)" onChange={handleChange(i)} />
                    <Form.Text className="text-muted">
                        Enter the homepage of the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"ReplyUrls-" + i}>
                    <Form.Label>ReplyUrls</Form.Label>
                    <Form.Control type="text" placeholder="Enter the reply url (if any)" onChange={handleChange(i)} />
                    <Form.Text className="text-muted">
                        Enter the reply url(s) for the application. If more than one, separate them with a blank space.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"LogoutUrl-" + i}>
                    <Form.Label>LogoutUrl</Form.Label>
                    <Form.Control type="text" placeholder="Enter the logout url (if any)" onChange={handleChange(i)} />
                    <Form.Text className="text-muted">
                        Enter the logout URL of the application.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId={"PasswordCredentials-" + i}>
                    <Form.Check type="checkbox" label="PasswordCredentials" onChange={handleChange(i)} value={"Auto"} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId={"AllowImplicitFlow-" + i}>
                    <Form.Check type="checkbox" label="AllowImplicitFlow" onChange={handleChange(i)} value={true} />
                </Form.Group>

                <Form.Group className="mb-3" controlId={"UsesROPCOrIWA-" + i}>
                    <Form.Check type="checkbox" label="UsesROPCOrIWA" onChange={handleChange(i)} value={true} />
                </Form.Group>
            
                { apps[i].RequiredResourcesAccess.length > 0 ? apps[i].RequiredResourcesAccess.map((resource, index) => {
                        return (
                            <div id={"RequiredResourcesAccess-" + index} key={"RequiredResourcesAccess-" + index}>
                                <Form.Group className="mb-3" controlId={"RequiredResourcesAccess-Resource"}>
                                    <Form.Label>Resource</Form.Label>
                                    <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange(i, index)} custom required>
                                        <option disabled selected></option>
                                        <option>Microsoft Graph</option>
                                        <option>Windows Azure Service Management API</option>
                                        { apps.some((app) => app.Kind === "WebApi") ? <option>{apps.find((app) => app.Kind === "WebApi").Id}</option> : null}
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the resource.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={"RequiredResourcesAccess-DelegatedPermissions"}>
                                    <Form.Label>Delegated Permissions</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the scopes" onChange={handleChange(i, index)} />
                                    <Form.Text className="text-muted">
                                        Enter the name of the permissions. If more than one, separate them with a blank space.
                                    </Form.Text>
                                </Form.Group>
                            </div>
                        );
                    }) : null }
    
                <Button variant="primary" onClick={() => addNewStep(i, "RequiredResourcesAccess")}>
                    Add a resource
                </Button>

                { apps[i].SecurityGroups.length > 0 ?
                 [<div key={"GroupMembershipClaims-" + i}>
                    <Form.Group className="mb-3" controlId={"GroupMembershipClaims-" + i}>
                        <Form.Label>Group Membership Claims</Form.Label>
                        <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange(i)} custom>
                            <option>None</option>
                            <option>Security Group</option>
                            <option>ApplicationGroup</option>
                            <option>DirectoryRole</option>
                            <option>All</option>
                        </Form.Control>
                        <Form.Text className="text-muted">
                            Select the group membership type for the application.
                        </Form.Text>
                    </Form.Group>
                 </div>
                 ].concat(apps[i].SecurityGroups.map((group, index) => {
                    return (
                        <div id={"SecurityGroups-" + index} key={"SecurityGroups-" + index}>
                            <Form.Group className="mb-3" controlId={"SecurityGroups-Name"}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter the name of the group" onChange={handleChange(i, index)} />
                                <Form.Text className="text-muted">
                                    Enter the name of the group.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId={"SecurityGroups-Description"}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter a description for the group" onChange={handleChange(i, index)} />
                                <Form.Text className="text-muted">
                                    Enter a description for the group.
                                </Form.Text>
                            </Form.Group>
                        </div>
                    );
                }))
                     : null }

                <Button variant="primary" onClick={() => addNewStep(i, "SecurityGroups")}>
                    Add a group
                </Button>

                { apps[i].AppRoles.length > 0 ? apps[i].AppRoles.map((role, index) => {
                        return (
                            <div id={"AppRoles-" + index} key={"AppRoles-" + index}>
                                <Form.Group className="mb-3" controlId={"AppRoles-Types"}>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control className="mx-2" as="select" size="lg" onChange={handleChange(i, index)} custom required>
                                        <option disabled selected></option>
                                        <option>App</option>
                                        <option>User</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the type of the role.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={"AppRoles-Name"}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a name for the role" onChange={handleChange(i, index)} />
                                    <Form.Text className="text-muted">
                                        Enter a name for the role.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId={"AppRoles-Description"}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the description for the role" onChange={handleChange(i, index)} />
                                    <Form.Text className="text-muted">
                                        Enter the description for the role.
                                    </Form.Text>
                                </Form.Group>
                            </div>
                        );
                    }) : null }

                <Button variant="primary" onClick={() => addNewStep(i, "AppRoles")}>
                    Add a role
                </Button>

                { apps[i].ManualSteps.length > 0 ? apps[i].ManualSteps.map((step, index) => {
                        return (
                            <div id={"ManualSteps-" + index} key={"ManualSteps-" + index}>
                                <Form.Group className="mb-3" controlId={"ManualSteps-Comment"}>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control type="text" placeholder="Describe the manual step" onChange={handleChange(i, index)} />
                                    <Form.Text className="text-muted">
                                        Describe the manual step.
                                    </Form.Text>
                                </Form.Group>
                            </div>
                        );
                    }) : null }

                <Button variant="primary" onClick={() => addNewStep(i, "ManualSteps")}>
                    Add a manual step
                </Button>
                <hr />
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
                {
                    appForm.length > 0 ? 
                        <Button variant="primary" type="submit">
                            Next
                        </Button>
                    :
                        null
                }
            </Form>
        </>
    );
};