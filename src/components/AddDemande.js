import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AddDemand.css'; // Import the CSS file

const AddDemande = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;

  const [sujet, setSujet] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8099/api/demandes', {
        sujet,
        description,
        dateCreation: new Date().toISOString(),
        eleve: { id: user.id }
      });
      setSuccess('Demande created successfully!');
      setSujet('');
      setDescription('');
      setError('');

      // Navigate back to the profile page
      navigate('/profile', { state: { user } });
    } catch (error) {
      console.error('There was an error creating the demande!', error);
      setError('Error creating demande');
      setSuccess('');
    }
  };

  return (
    <div className="add-demande-container">
      <h2>Create Demande</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="add-demande-form" onSubmit={handleSubmit}>
        <div>
          <label>Sujet:</label>
          <input
            type="text"
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Demande</button>
      </form>
    </div>
  );
};

export default AddDemande;
