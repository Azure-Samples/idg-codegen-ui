import { createContext, useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { TabPanel } from './components/TabContainer';

import './styles/App.css';

export const SampleContext = createContext();

function App() {

  const [sample, setSample] = useState({
    Sample: {},
    AADApps: [],
    CodeConfiguration: [],
  });

  const sampleObject = {
    sample,
    setSample
  }

  return (
    <SampleContext.Provider value={sampleObject}>
      <NavigationBar />
      <TabPanel />
    </SampleContext.Provider>
  );
}

export default App;
