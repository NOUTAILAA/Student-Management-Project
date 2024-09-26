import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './ClassesList.css'; // Import the CSS file

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [newClassDescription, setNewClassDescription] = useState('');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [editingClass, setEditingClass] = useState(null); // State to track the class being edited
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []); // Fetch classes only once when the component mounts

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8099/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('There was an error fetching the classes!', error);
      setError('Error fetching classes');
    }
  };

  const addOrUpdateClass = async () => {
    try {
      if (editingClass) {
        // Update existing class
        await axios.put(`http://localhost:8099/api/classes/${editingClass.id}`, {
          name: newClassName,
          description: newClassDescription,
        });
      } else {
        // Add new class
        await axios.post('http://localhost:8099/api/classes', {
          name: newClassName,
          description: newClassDescription,
        });
      }
      fetchClasses(); // Refresh the classes list after adding/updating a class
      setNewClassName(''); // Clear the input fields after adding/updating the class
      setNewClassDescription('');
      setIsAddingClass(false); // Hide the add/edit class form
      setEditingClass(null); // Clear editing state
    } catch (error) {
      console.error('Error adding/updating class', error);
      setError('Error adding/updating class');
    }
  };

  const deleteClass = async (id) => {
    try {
      await axios.delete(`http://localhost:8099/api/classes/${id}`);
      fetchClasses(); // Refresh the classes list after deleting a class
    } catch (error) {
      console.error('Error deleting class', error);
      setError('Error deleting class');
    }
  };

  const editClass = (id) => {
    const classToEdit = classes.find(classe => classe.id === id);
    setEditingClass(classToEdit);
    setNewClassName(classToEdit.name); // Pre-fill the input fields with class details
    setNewClassDescription(classToEdit.description);
    setIsAddingClass(true); // Show the add/edit class form
  };

  return (
    <div className="container">
      <Navbar />
      <h2>Classes List</h2>
      {error && <p className="error-message">{error}</p>}
      {!isAddingClass && (
        <button className="button" onClick={() => setIsAddingClass(true)}>Add Class</button>
      )}
      {isAddingClass && (
        <div className="form-group">
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="Enter class name"
          />
          <input
            type="text"
            value={newClassDescription}
            onChange={(e) => setNewClassDescription(e.target.value)}
            placeholder="Enter class description"
          />
          <button className="button" onClick={addOrUpdateClass}>
            {editingClass ? 'Update' : 'Save'}
          </button>
          <button className="button" onClick={() => {
            setIsAddingClass(false);
            setEditingClass(null);
          }}>Cancel</button>
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
          {classes.map(classe => (
            <tr key={classe.id}>
              <td>{classe.id}</td>
              <td>{classe.name}</td>
              <td>{classe.description}</td>
              <td className="table-actions">
                <button className="delete-button" onClick={() => deleteClass(classe.id)}>Delete</button>
                <button className="edit-button" onClick={() => editClass(classe.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassesList;
