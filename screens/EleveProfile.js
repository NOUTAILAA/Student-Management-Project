import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Navbaar from './Navbaar';

const EleveProfile = ({ route, navigation }) => {
  const { eleve } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(eleve.firstName);
  const [lastName, setLastName] = useState(eleve.lastName);
  const [email, setEmail] = useState(eleve.email);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sujet, setSujet] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ sujet: '', description: '' });

  const handleSave = () => {
    const updatedEleve = { ...eleve, firstName, lastName, email };
    axios.put(`http://192.168.213.141:8099/api/eleves/${eleve.id}`, updatedEleve)
      .then(response => {
        Alert.alert('Succès', 'Profil mis à jour avec succès');
        setIsEditing(false);
        navigation.navigate('EleveProfile', { eleve: response.data });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du profil:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du profil');
      });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!sujet) newErrors.sujet = 'Le sujet est requis';
    if (!description) newErrors.description = 'La description est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDemande = () => {
    if (validateFields()) {
      const newDemande = {
        sujet,
        description,
        eleve: { id: eleve.id }
      };
      axios.post('http://192.168.213.141:8099/api/demandes', newDemande)
        .then(response => {
          Alert.alert('Succès', 'Demande ajoutée avec succès');
          setIsModalVisible(false);
          setSujet('');
          setDescription('');
          setErrors({ sujet: '', description: '' });
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la demande:', error);
          Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout de la demande');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil de l'élève</Text>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsEditing(false)}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>CIN:</Text>
            <Text style={styles.value}>{eleve.cin}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Prénom:</Text>
            <Text style={styles.value}>{eleve.firstName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nom:</Text>
            <Text style={styles.value}>{eleve.lastName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{eleve.email}</Text>
          </View>
          {eleve.classe && (
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Classe:</Text>
              <Text style={styles.value}>{eleve.classe.name}</Text>
            </View>
          )}
          {eleve.groupe && (
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Groupe:</Text>
              <Text style={styles.value}>{eleve.groupe.name}</Text>
            </View>
          )}
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.addButton]} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.buttonText}>Ajouter une demande</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={() => navigation.navigate('MesDemandes', { eleve })}>
        <Text style={styles.buttonText}>Voir mes demandes</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Ajouter une demande</Text>
            <TextInput
              style={styles.input}
              placeholder="Sujet"
              value={sujet}
              onChangeText={setSujet}
            />
            {errors.sujet ? <Text style={styles.errorText}>{errors.sujet}</Text> : null}
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleAddDemande}>
                <Text style={styles.buttonText}>Ajouter</Text>
              </TouchableOpacity>
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#777',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  descriptionInput: {
    height: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  cancelButton: {
    backgroundColor: '#ff9800',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  backButton: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
  viewButton: {
    backgroundColor: '#8BC34A',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#FFC107',
    marginTop: 20,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default EleveProfile;
