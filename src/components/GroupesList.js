import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './GroupesList.css'; // Import the CSS file

const GroupesList = () => {
  const [groupes, setGroupes] = useState([]);
  const [newGroupeName, setNewGroupeName] = useState('');
  const [newGroupeDescription, setNewGroupeDescription] = useState('');
  const [isAddingGroupe, setIsAddingGroupe] = useState(false);
  // eslint-disable-next-line
  const [editingGroupe, setEditingGroupe] = useState(null); // State to track the class being edited
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGroupes();
  }, []); // Fetch groupes only once when the component mounts

  const fetchGroupes = async () => {
    try {
      const response = await axios.get('http://localhost:8099/api/groupes');
      setGroupes(response.data);
    } catch (error) {
      console.error('There was an error fetching the groupes!', error);
      setError('Error fetching groupes');
    }
  };

  const addGroupe = async () => {
    try {
      await axios.post('http://localhost:8099/api/groupes', {
        name: newGroupeName,
        description: newGroupeDescription
      });
      fetchGroupes(); // Refresh the groupes list after adding a new groupe
      setNewGroupeName(''); // Clear the input fields after adding the groupe
      setNewGroupeDescription('');
      setIsAddingGroupe(false); // Hide the add groupe form
    } catch (error) {
      console.error('Error adding groupe', error);
      setError('Error adding groupe');
    }
  };

  const deleteGroupe = async (id) => {
    try {
      await axios.delete(`http://localhost:8099/api/groupes/${id}`);
      fetchGroupes(); // Refresh the groupes list after deleting a groupe
    } catch (error) {
      console.error('Error deleting groupe', error);
      setError('Error deleting groupe');
    }
  };

  const editGroupe = (id) => {
    const groupeToEdit = groupes.find(groupe => groupe.id === id);
    setEditingGroupe(groupeToEdit);
    setNewGroupeName(groupeToEdit.name); // Pre-fill the input fields with groupe details
    setNewGroupeDescription(groupeToEdit.description);
    setIsAddingGroupe(true); // Show the add groupe form in edit mode
  };

  return (
    <div className="container">
      <Navbar />
      <h2>Groupes List</h2>
      {error && <p className="error-message">{error}</p>}
      {!isAddingGroupe && (
        <button className="button" onClick={() => setIsAddingGroupe(true)}>Add Groupe</button>
      )}
      {isAddingGroupe && (
        <div className="form-group">
          <input
            type="text"
            value={newGroupeName}
            onChange={(e) => setNewGroupeName(e.target.value)}
            placeholder="Enter groupe name"
          />
          <input
            type="text"
            value={newGroupeDescription}
            onChange={(e) => setNewGroupeDescription(e.target.value)}
            placeholder="Enter groupe description"
          />
          <button className="button" onClick={addGroupe}>Save</button>
          <button className="button" onClick={() => setIsAddingGroupe(false)}>Cancel</button>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groupes.map(groupe => (
            <tr key={groupe.id}>
              <td>{groupe.id}</td>
              <td>{groupe.name}</td>
              <td>{groupe.description}</td>
              <td className="table-actions">
                <button className="delete-button" onClick={() => deleteGroupe(groupe.id)}>Delete</button>
                <button className="edit-button" onClick={() => editGroupe(groupe.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupesList;
