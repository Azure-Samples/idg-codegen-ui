import { useState } from 'react';
import { Tabs, Tab } from "react-bootstrap";

import { DescriptionForm } from './DescriptionForm';
import { ApplicationForm } from './ApplicationForm';
import { ConfigurationForm } from './ConfigurationForm';
import { ReviewPanel } from './ReviewPanel';

export const TabContainer = () => {

    const [key, setKey] = useState('description');

    return (
        <div className="main-div">
            <Tabs
                className="tab-area"
                variant="pills"
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                transition={false}
            >
                <Tab className="tab-item" eventKey="description" title="Description">
                    <DescriptionForm handleNext={(k) => setKey(k)}/>
                </Tab>
                <Tab className="tab-item" eventKey="apps" title="Application(s)">
                    <ApplicationForm handleNext={(k) => setKey(k)}/>
                </Tab>
                <Tab className="tab-item" eventKey="config" title="Configuration">
                    <ConfigurationForm handleNext={(k) => setKey(k)}/>
                </Tab>
                { key === 'review' ?                 
                <Tab className="tab-item" eventKey="review" title="Review">
                    <ReviewPanel handleNext={(k) => setKey(k)}/>
                </Tab> 
                : 
                null }
            </Tabs>
        </div>
    );
};