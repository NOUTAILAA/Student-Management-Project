import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importez le fichier CSS

const Login = () => {
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const [user, setUser] = useState(null); // Nouvel état pour stocker les informations de l'utilisateur

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (cin === 'admin' && password === '123AZEQSD') {
        alert('Hello');
        navigate('/students'); // Utilisez navigate pour naviguer vers la page des étudiants
        return;
      }

      const response = await axios.post('http://localhost:8099/api/eleves/login', {
        cin,
        password,
      });
      const userData = response.data; // Données de l'utilisateur
      setUser(userData); // Stockez les données de l'utilisateur dans l'état
      navigate('/profile', { state: { user: userData } }); // Passez l'objet user lors de la navigation
    } catch (error) {
      console.error('There was an error!', error.response || error.message);
      setError(error.response ? error.response.data.message : 'Invalid CIN or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>CIN:</label>
          <input
            type="text"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
