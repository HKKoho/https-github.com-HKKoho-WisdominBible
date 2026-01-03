
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ModuleList from './components/ModuleList';
import ModulePlayer from './components/ModulePlayer';
import Login from './components/Login';
import { Module, User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  // Load user from storage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('wisdom_prism_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser({ ...parsed, loginTime: new Date(parsed.loginTime) });
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('wisdom_prism_user', JSON.stringify(newUser));
  };

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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('wisdom_prism_user');
  };

  return (
    <Layout onHomeClick={handleHomeClick}>
      {!user && <Login onLogin={handleLogin} />}
      
      {user && (
        <div className="mb-6 flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold">學員</span>
            <span className="font-medium text-slate-600">{user.name}</span>
          </div>
          <button onClick={handleLogout} className="hover:text-amber-600 transition-colors underline">登出 / 更換學員</button>
        </div>
      )}

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
