import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import Navbar from './Navbar';
import './StudentsList.css'; // Import the CSS file

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8099/api/eleves');
        setStudents(response.data);
      } catch (error) {
        console.error('There was an error fetching the students!', error);
        setError('Error fetching students');
      }
    };

    fetchStudents();
  }, [showAddStudentForm, editingStudent]); // Re-fetch students when the form is closed or edited

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8099/api/eleves/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student', error);
      setError('Error deleting student');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h2>Students List</h2>
      {error && <p className="error-message">{error}</p>}
      <button className="button" onClick={() => setShowAddStudentForm(true)}>Add Student</button>
      {showAddStudentForm && <AddStudent onClose={() => setShowAddStudentForm(false)} />}
      {editingStudent && (
        <EditStudent
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>CIN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.cin}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
              <td>{student.classe ? student.classe.name : 'N/A'}</td>
              <td>{student.groupe ? student.groupe.name : 'N/A'}</td>
              <td className="table-actions">
                <button className="edit-button" onClick={() => setEditingStudent(student)}>Edit</button>
                <button className="delete-button" onClick={() => deleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
