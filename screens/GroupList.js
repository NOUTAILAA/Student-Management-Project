import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Navbar from './Navbar';
import AddGroup from './AddGroup';

const GroupListPage = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroupId, setEditingGroupId] = useState(null); // Identifiant du groupe en cours d'édition
  const [editedGroupName, setEditedGroupName] = useState('');
  const [editedGroupDescription, setEditedGroupDescription] = useState('');
  const [isAddGroupVisible, setIsAddGroupVisible] = useState(false); // Contrôler la visibilité du formulaire d'ajout

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    axios.get('http://192.168.213.141:8099/api/groupes')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
      });
  };

  const handleEdit = (groupId, groupName, groupDescription) => {
    // Mettre à jour l'état local avec les informations du groupe à éditer
    setEditingGroupId(groupId);
    setEditedGroupName(groupName);
    setEditedGroupDescription(groupDescription);
  };

  const handleClose = () => {
    // Réinitialiser l'état local pour fermer le formulaire d'édition
    setEditingGroupId(null);
    setEditedGroupName('');
    setEditedGroupDescription('');
  };

  const handleSubmit = () => {
    // Envoyer les modifications au backend
    const updatedGroup = {
      name: editedGroupName,
      description: editedGroupDescription
    };

    axios.put(`http://192.168.213.141:8099/api/groupes/${editingGroupId}`, updatedGroup)
      .then(response => {
        console.log('Group updated successfully:', response.data);
        // Rafraîchir la liste des groupes après la modification
        fetchGroups();
        // Fermer le formulaire d'édition
        handleClose();
      })
      .catch(error => {
        console.error('Error updating group:', error);
      });
  };

  const handleDelete = (groupId) => {
    // Afficher une alerte de confirmation avant de supprimer le groupe
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce groupe ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Supprimer le groupe en appelant l'API
            axios.delete(`http://192.168.213.141:8099/api/groupes/${groupId}`)
              .then(response => {
                console.log('Group deleted successfully:', response.data);
                // Rafraîchir la liste des groupes après la suppression
                fetchGroups();
              })
              .catch(error => {
                console.error('Error deleting group:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleAddGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
    setIsAddGroupVisible(false); // Masquer le formulaire après l'ajout
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.header}>Group List</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Group Name: {item.name}</Text>
            <Text style={styles.itemText}>Description: {item.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEdit(item.id, item.name, item.description)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {editingGroupId !== null && (
        <View style={styles.editContainer}>
          <TextInput
            placeholder="Group Name"
            value={editedGroupName}
            onChangeText={text => setEditedGroupName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Group Description"
            value={editedGroupDescription}
            onChangeText={text => setEditedGroupDescription(text)}
            style={styles.input}
            multiline={true}
            numberOfLines={4}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={handleClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => setIsAddGroupVisible(true)}
      >
        <Text style={styles.buttonText}>Add Group</Text>
      </TouchableOpacity>
      <Modal
        visible={isAddGroupVisible}
        transparent={true}
        onRequestClose={() => setIsAddGroupVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <AddGroup onGroupAdded={handleAddGroup} onClose={() => setIsAddGroupVisible(false)} />
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
  closeButton: {
    backgroundColor: '#ff9800',
  },
  submitButton: {
    backgroundColor: '#2196F3',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editContainer: {
    marginTop: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
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
});

export default GroupListPage;
