import { useContext, useState } from 'react';
import { marked } from "marked";

import { SampleContext } from '../App';

export const TestMarkdown = _ => {
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
            const hljs = require('highlight.js');
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    const sampleContext = useContext(SampleContext);

    const [description, setDescription] = useState({
        ReadmeScenario: {
            MainText: '',
            Image: '',
            AdditionalNotes: ''
        },
        ReadmePrerequirements: {
            FreeWording: ''
        },
        ReadmeSetup: {
            UseNewSetup: ''
        },
        ReadmeTroubleshooting: {
            FreeText: ''
        },
        ReadmeNextSteps: {
            FreeText: ''
        },
        ReadmeAboutTheCode: {
            FreeText: '',
        },
        ReadmeUsingTheSample: {
            FreeText: ''
        },
        ReadmeLearnMore: {
            FreeText: ''
        },
    });

    const handleChange = (property, subProperty, value) => {
        setDescription({
            ...description,
            [property]: {
                ...description[property],
                [subProperty]: value
            }
        });
    }

    const handleSubmit = _ => {

        // update the state
        sampleContext.setSample({
            ...sampleContext.sample,
            ...description
        });
    }

    const createPreview = (entryElemId, contentId) => {
        const markdown = document.getElementById(entryElemId).value
        document.getElementById(contentId).innerHTML = marked.parse(markdown);

        const [property, subProperty] = entryElemId.split('-');

        handleChange(property, subProperty, markdown);
        handleSubmit();
    }

    return (
        <div>
            <h1>README MARKDOWN DEMO</h1>

            <h1>Scenario (main text)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeScenario-MainText", "ReadmeScenarioPreview-MainText")} placeholder="Write markdown here" id="ReadmeScenario-MainText" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeScenarioPreview-MainText"></div>
            <h1>Scenario (image path)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeScenario-Image", "ReadmeScenarioPreview-Image")} placeholder="Write image file path here" id="ReadmeScenario-Image" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeScenarioPreview-Image"></div>
            <h1>Scenario (additional notes)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeScenario-AdditionalNotes", "ReadmeScenarioPreview-AdditionalNotes")} placeholder="Write markdown here" id="ReadmeScenario-AdditionalNotes" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeScenarioPreview-AdditionalNotes"></div>
            <h1>Prerequirements (free wording)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmePrerequirements-FreeWording", "ReadmePrerequirementsPreview-FreeWording")} placeholder="Write markdown here" id="ReadmePrerequirements-FreeWording" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmePrerequirementsPreview-FreeWording"></div>
            <h1>Setup (use new setup)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeSetup-UseNewSetup", "ReadmeSetupPreview-UseNewSetup")} placeholder="Enter '0' or '1'" id="ReadmeSetup-UseNewSetup" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeSetupPreview-UseNewSetup"></div>
            <h1>Trouble Shooting (free text)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeTroubleshooting-FreeText", "ReadmeTroubleshootingPreview-FreeText")} placeholder="Write markdown here" id="ReadmeTroubleshooting-FreeText" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeTroubleshootingPreview-FreeText"></div>
            <h1>Next Steps (free text)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeNextSteps-FreeText", "ReadmeNextStepsPreview-FreeText")} placeholder="Write markdown here" id="ReadmeNextSteps-FreeText" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeNextStepsPreview-FreeText"></div>
            <h1>About the Code (free text)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeAboutTheCode-FreeText", "ReadmeAboutTheCodePreview-FreeText")} placeholder="Write markdown here" id="ReadmeAboutTheCode-FreeText" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeAboutTheCodePreview-FreeText"></div>
            <h1>Azure Deploy (free text)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeAzureDeploy-FreeText", "ReadmeAzureDeployPreview-FreeText")} placeholder="Write markdown here" id="ReadmeAzureDeploy-FreeText" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeAzureDeployPreview-FreeText"></div>
            <h1>Using the Sample (free text)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeUsingTheSample-FreeText", "ReadmeUsingTheSamplePreview-FreeText")} placeholder="Write markdown here" id="ReadmeUsingTheSample-FreeText" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeUsingTheSamplePreview-FreeText"></div>
            <h1>Learn More (free text)</h1>
            <div>
                <textarea onChange={_ => createPreview("ReadmeLearnMore-FreeText", "ReadmeLearnMorePreview-FreeText")} placeholder="Write markdown here" id="ReadmeLearnMore-FreeText" style={{ "width": "1000px" }}></textarea>
            </div>
            <div id="ReadmeLearnMorePreview-FreeText"></div>
        </div>
    );
}