import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddStudent.css'; // Import the CSS file

const AddStudent = ({ onClose }) => {
  const [cin, setCin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [classeId, setClasseId] = useState('');
  const [groupeId, setGroupeId] = useState('');
  const [classes, setClasses] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesResponse = await axios.get('http://localhost:8099/api/classes');
        const groupesResponse = await axios.get('http://localhost:8099/api/groupes');
        setClasses(classesResponse.data);
        setGroupes(groupesResponse.data);
      } catch (error) {
        console.error('There was an error fetching the classes or groupes!', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8099/api/eleves', {
        cin,
        firstName,
        lastName,
        email,
        dateOfBirth,
        mdp: password,
        classe: { id: classeId },
        groupe: { id: groupeId },
      });
      onClose();
    } catch (error) {
      console.error('There was an error adding the student!', error);
      setError('Error adding student');
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add Student</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="add-student-form" onSubmit={handleSubmit}>
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
          <select
            value={classeId}
            onChange={(e) => setClasseId(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((classe) => (
              <option key={classe.id} value={classe.id}>
                {classe.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Group:</label>
          <select
            value={groupeId}
            onChange={(e) => setGroupeId(e.target.value)}
            required
          >
            <option value="">Select Group</option>
            {groupes.map((groupe) => (
              <option key={groupe.id} value={groupe.id}>
                {groupe.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Student</button>
      </form>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default AddStudent;
