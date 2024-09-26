import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const StudentDetails = ({ route }) => {
  const { student } = route.params;
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditStudent', { student });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cet étudiant ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => {
            axios.delete(`http://192.168.213.141:8099/api/eleves/${student.id}`)
              .then(response => {
                console.log('Student deleted successfully:', response.data);
                navigation.goBack(); // Retourner à la liste des étudiants après suppression
              })
              .catch(error => {
                console.error('Error deleting student:', error);
              });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CIN: {student.cin}</Text>
      <Text style={styles.label}>First Name: {student.firstName}</Text>
      <Text style={styles.label}>Last Name: {student.lastName}</Text>
      <Text style={styles.label}>Password: {student.mdp}</Text>
      <Text style={styles.label}>Class: {student.classe ? student.classe.name : 'N/A'}</Text>
      <Text style={styles.label}>Group: {student.groupe ? student.groupe.name : 'N/A'}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StudentDetails;
