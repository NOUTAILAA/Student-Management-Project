import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import EditProfile from './EditProfile';
import './Profile.css';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [isEditing, setIsEditing] = useState(false);

  const generateReport = () => {
    const doc = new jsPDF();

    // Add title
    doc.text('Student Report', 20, 10);

    // Add user details
    doc.autoTable({
      startY: 20,
      head: [['Field', 'Value']],
      body: [
        ['CIN', user.cin],
        ['Username', user.lastName],
        ['Name', user.firstName],
        ['Email', user.email],
        ['Password', user.mdp],
        ['Group', user.groupe ? user.groupe.name : 'N/A'],
        ['Class', user.classe ? user.classe.name : 'N/A'],
      ],
    });

    // Save the PDF
    doc.save('student_report.pdf');
  };

  const handlePasserDemande = () => {
    navigate('/add-demande', { state: { user } });
  };

  const handleViewDemandes = () => {
    navigate('/user-demandes', { state: { user } });
  };

  if (!user) {
    return null; // or a loading indicator, or redirect to login
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {!isEditing ? (
        <div>
          <div className="profile-detail">
            <label>CIN:</label> <span>{user.cin}</span>
          </div>
          <div className="profile-detail">
            <label>Username:</label> <span>{user.lastName}</span>
          </div>
          <div className="profile-detail">
            <label>Name:</label> <span>{user.firstName}</span>
          </div>
          <div className="profile-detail">
            <label>Email:</label> <span>{user.email}</span>
          </div>
          <div className="profile-detail">
            <label>Password:</label> <span>{user.mdp}</span>
          </div>
          <div className="profile-detail">
            <label>Group:</label> <span>{user.groupe ? user.groupe.name : 'N/A'}</span>
          </div>
          <div className="profile-detail">
            <label>Class:</label> <span>{user.classe ? user.classe.name : 'N/A'}</span>
          </div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="report-button" onClick={generateReport}>Generate Report</button>
          <button className="demande-button" onClick={handlePasserDemande}>Passer Demande</button>
          <button className="view-demandes-button" onClick={handleViewDemandes}>View My Requests</button>
        </div>
      ) : (
        <EditProfile user={user} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default Profile;
