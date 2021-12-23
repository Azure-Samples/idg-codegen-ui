import { createContext, useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { TabContainer } from './components/TabContainer';

import './styles/App.css';

export const SampleContext = createContext();

function App() {

  /**
   * Object matching to fields from the sample.json schema
   */
  const sampleObject = {
    Sample: {},
    AADApps: [],
    CodeConfiguration: [],
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
    ReadmeAzureDeploy: {
      FreeText: ''
    },
    ReadmeUsingTheSample: {
      FreeText: ''
    },
    ReadmeLearnMore: {
      FreeText: ''
    },
  };

  const [sample, setSample] = useState(sampleObject);

  const stateObject = {
    sample,
    setSample
  };

  return (
    <SampleContext.Provider value={stateObject}>
      <NavigationBar />
      <TabContainer />
    </SampleContext.Provider>
  );
}

export default App;
