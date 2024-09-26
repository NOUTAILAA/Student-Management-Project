import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const EditStudent = ({ route }) => {
  const { student } = route.params;
  const [updatedStudent, setUpdatedStudent] = useState(student);
  const navigation = useNavigation();

  const handleSave = () => {
    axios.put(`http://192.168.213.141:8099/api/eleves/${student.id}`, updatedStudent)
      .then(response => {
        console.log('Student updated successfully:', response.data);
        navigation.navigate('Eleve');// Retourner à l'écran précédent après la mise à jour
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CIN:</Text>
      <TextInput
        style={styles.input}
        value={updatedStudent.cin}
        onChangeText={(text) => setUpdatedStudent({ ...updatedStudent, cin: text })}
      />
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={updatedStudent.firstName}
        onChangeText={(text) => setUpdatedStudent({ ...updatedStudent, firstName: text })}
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={updatedStudent.lastName}
        onChangeText={(text) => setUpdatedStudent({ ...updatedStudent, lastName: text })}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={updatedStudent.mdp}
        onChangeText={(text) => setUpdatedStudent({ ...updatedStudent, mdp: text })}
        
      />
      <Button title="Save" onPress={handleSave} />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default EditStudent;
