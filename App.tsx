
import React, { useState } from 'react';
import Layout from './components/Layout';
import ModuleList from './components/ModuleList';
import ModulePlayer from './components/ModulePlayer';
import { Module } from './types';

const App: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    setSelectedModule(null);
  };

  const handleModuleComplete = () => {
    if (selectedModule) {
      setCompletedModules(prev => Array.from(new Set([...prev, selectedModule.id])));
      setSelectedModule(null);
    }
  };

  return (
    <Layout onHomeClick={handleHomeClick}>
      {selectedModule ? (
        <ModulePlayer 
          module={selectedModule} 
          onComplete={handleModuleComplete} 
        />
      ) : (
        <ModuleList 
          onSelectModule={handleModuleSelect} 
        />
      )}
    </Layout>
  );
};

export default App;
