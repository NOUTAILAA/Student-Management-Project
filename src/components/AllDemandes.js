import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllDemandes.css';
import Navbar from './Navbar';

const AllDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get('http://localhost:8099/api/demandes');
        setDemandes(response.data);
      } catch (error) {
        console.error('There was an error fetching the demandes!', error);
        setError('Error fetching demandes');
      }
    };

    fetchDemandes();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:8099/api/demandes/${id}/accept`);
      setDemandes(demandes.map(demande => 
        demande.id === id ? { ...demande, state: 'acceptée' } : demande
      ));
    } catch (error) {
      console.error('There was an error accepting the demande!', error);
      setError('Error accepting demande');
    }
  };

  const handleRefuse = async (id) => {
    try {
      await axios.put(`http://localhost:8099/api/demandes/${id}/refus`);
      setDemandes(demandes.map(demande => 
        demande.id === id ? { ...demande, state: 'refusée' } : demande
      ));
    } catch (error) {
      console.error('There was an error refusing the demande!', error);
      setError('Error refusing demande');
    }
  };

  return (
    <div className="all-demandes-container">
    <Navbar/>
      <h2>All Requests</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="demandes-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Sujet</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>{demande.eleve ? `${demande.eleve.firstName} ${demande.eleve.lastName}` : 'Unknown'}</td>
              <td>{demande.sujet}</td>
              <td>{demande.description}</td>
              <td>{new Date(demande.dateCreation).toLocaleDateString()}</td>
              <td>{demande.state}</td>
              <td>
                <button onClick={() => handleAccept(demande.id)} disabled={demande.state === 'acceptée' || demande.state === 'refusée'}>
                  Accepter
                </button>
                <button onClick={() => handleRefuse(demande.id)} disabled={demande.state === 'acceptée' || demande.state === 'refusée'}>
                  Refuser
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDemandes;
