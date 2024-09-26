import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';
import AddClass from './AddClass';
import Navbar from './Navbar';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editedClass, setEditedClass] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    axios.get('http://192.168.213.141:8099/api/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  };

  const addClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  const deleteClass = (classId) => {
    axios.delete(`http://192.168.213.141:8099/api/classes/${classId}`)
      .then(response => {
        console.log('Class deleted successfully:', response.data);
        setClasses(classes.filter(classItem => classItem.id !== classId));
      })
      .catch(error => {
        console.error('Error deleting class:', error);
      });
  };

  const confirmDeleteClass = (classId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this class?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteClass(classId) },
      ],
      { cancelable: true }
    );
  };

  const openEditModal = (classItem) => {
    setSelectedClass(classItem);
    setEditedClass({ name: classItem.name, description: classItem.description });
    setIsEditModalVisible(true);
  };

  const handleEditClass = () => {
    if (selectedClass) {
      axios.put(`http://192.168.213.141:8099/api/classes/${selectedClass.id}`, editedClass)
        .then(response => {
          console.log('Class updated successfully:', response.data);
          fetchClasses(); // Refresh the list after editing
          setIsEditModalVisible(false);
          setSelectedClass(null);
          setEditedClass({ name: '', description: '' });
        })
        .catch(error => {
          console.error('Error updating class:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <AddClass onClassAdded={addClass} />
      <Text style={styles.header}>Class List</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Class Name: {item.name}</Text>
            <Text style={styles.itemText}>Description: {item.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => openEditModal(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => confirmDeleteClass(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* Modal for editing class */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Edit Class</Text>
            <TextInput
              style={styles.input}
              placeholder="Class Name"
              value={editedClass.name}
              onChangeText={(text) => setEditedClass({ ...editedClass, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={editedClass.description}
              onChangeText={(text) => setEditedClass({ ...editedClass, description: text })}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Save Changes" onPress={handleEditClass} />
              <Button title="Cancel" onPress={() => setIsEditModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 12,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
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
  modalHeader: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ClassList;
