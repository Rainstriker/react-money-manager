import React, { useState } from 'react';
import PrivateRoutes from './private-routes/PrivateRoutes';
import LocalStorageService from './services/localStorageService';
import './App.css';

function App() {
  const [role, setRole] = useState(LocalStorageService.getRole());
  return (
    <React.Fragment>
      <PrivateRoutes role={role} setRole={setRole}/>
    </React.Fragment>
  );
}

export default App;
