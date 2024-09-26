import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GroupesList from './components/GroupesList';
import Login from './components/Login';
import ClassesList from './components/ClassesList';
import StudentsList from './components/StudentsList';
import AddDemande from './components/AddDemande';
import UserDemandes from './components/UserDemandes'; // Import the new component
import AllDemandes from './components/AllDemandes';
import Profile from './components/Profile';
 
const App = () => {
  return (
    <Router>
      <div>
        
        <Routes> {/* Envelopper vos routes dans un composant Routes */}
       
          <Route path="/" exact element={<Login />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/classes" element={<ClassesList />} />
          <Route path="/groupes" element={<GroupesList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-demande" element={<AddDemande />} />
          <Route path="/user-demandes" element={<UserDemandes />} /> {/* Add the new route */}
          <Route path="/all-demandes" element={<AllDemandes />} /> {/* Add the new route */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;
