import React, { useState } from 'react';
import axios from 'axios';
import './EditProfile.css'; // Create and import CSS file for this component

const EditProfile = ({ user, onClose }) => {
  const [cin, setCin] = useState(user.cin);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [password, setPassword] = useState(user.mdp);
  const [classeId, setClasseId] = useState(user.classe ? user.classe.name : '');
  const [groupeId, setGroupeId] = useState(user.groupe ? user.groupe.name : '');
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8099/api/eleves/${user.id}`, {
        cin,
        firstName,
        lastName,
        email,
        dateOfBirth,
        mdp: password,
        classe: { id: classeId },
        groupe: { id: groupeId },
      });
      onClose(); // Close the edit form
    } catch (error) {
      console.error('There was an error updating the student!', error);
      setError('Error updating student');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="edit-profile-form" onSubmit={handleUpdate}>
        <div>
          <label>CIN:</label>
          <input
            type="text"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            readOnly={true}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
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
        <div>
          <label>Class:</label>
          <input
            type="text"
            value={classeId}
            onChange={(e) => setClasseId(e.target.value)}
            readOnly={true}
          />
        </div>
        <div>
          <label>Group:</label>
          <input
            type="text"
            value={groupeId}
            onChange={(e) => setGroupeId(e.target.value)}
            readOnly={true}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <button className="close-button" onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditProfile;
