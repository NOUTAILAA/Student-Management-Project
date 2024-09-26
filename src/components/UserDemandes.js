import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './UserDemandes.css';

const UserDemandes = () => {
  const location = useLocation();
  const { user } = location.state;

  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get(`http://localhost:8099/api/eleves/${user.id}/demandes`);
        setDemandes(response.data);
      } catch (error) {
        console.error('There was an error fetching the demandes!', error);
        setError('Error fetching demandes');
      }
    };

    fetchDemandes();
  }, [user.id]);

  return (
    <div className="user-demandes-container">
      <h2>My Requests</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="demandes-table">
        <thead>
          <tr>
            <th>Sujet</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>{demande.sujet}</td>
              <td>{demande.description}</td>
              <td>{new Date(demande.dateCreation).toLocaleDateString()}</td>
              <td>{demande.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDemandes;
