import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AddGroup = ({ onGroupAdded, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleSubmit = () => {
    if (groupName.trim() === '' || groupDescription.trim() === '') {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }

    const newGroup = {
      name: groupName,
      description: groupDescription,
    };

    axios.post('http://192.168.213.141:8099/api/groupes', newGroup)
      .then(response => {
        console.log('Group added successfully:', response.data);
        onGroupAdded(response.data); // Appel de la fonction de mise à jour de la liste des groupes
        setGroupName(''); // Réinitialisation des champs de saisie après l'ajout
        setGroupDescription('');
        onClose(); // Fermer la modal après l'ajout
      })
      .catch(error => {
        console.error('Error adding group:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Group</Text>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={text => setGroupName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Group Description"
        value={groupDescription}
        onChangeText={text => setGroupDescription(text)}
        style={styles.input}
        multiline={true}
        numberOfLines={4}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Group" onPress={handleSubmit} />
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AddGroup;
