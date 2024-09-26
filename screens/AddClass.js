import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert } from 'react-native';
import axios from 'axios';

const AddClass = ({ onClassAdded }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
  });

  const handleAddClass = () => {
    if (newClass.name.trim() === '' || newClass.description.trim() === '') {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }

    axios.post('http://192.168.213.141:8099/api/classes', newClass)
      .then(response => {
        console.log('Class added successfully:', response.data);
        onClassAdded(response.data);
        setIsModalVisible(false);
        setNewClass({ name: '', description: '' });
      })
      .catch(error => {
        console.error('Error adding class:', error);
      });
  };

  return (
    <View>
      <Button title="Ajouter une classe" onPress={() => setIsModalVisible(true)} />
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.header}>Ajouter une classe</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de la classe"
              value={newClass.name}
              onChangeText={(text) => setNewClass({ ...newClass, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newClass.description}
              onChangeText={(text) => setNewClass({ ...newClass, description: text })}
            />
            <View style={styles.buttonContainer}>
              <Button title="Ajouter" onPress={handleAddClass} />
              <Button title="Fermer" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AddClass;
