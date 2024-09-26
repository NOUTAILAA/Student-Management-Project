import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Navbar from './Navbar';

const DemandesListPage = ({ navigation }) => {
  const [demandes, setDemandes] = useState([]);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [causeRefus, setCauseRefus] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = () => {
    axios.get('http://192.168.213.141:8099/api/demandes')
      .then(response => {
        setDemandes(response.data);
      })
      .catch(error => {
        console.error('Error fetching demandes:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des demandes');
      });
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cette demande ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            axios.delete(`http://192.168.213.141:8099/api/demandes/${id}`)
              .then(() => {
                fetchDemandes(); // Refresh the list after deletion
                Alert.alert('Succès', 'Demande supprimée avec succès');
              })
              .catch(error => {
                console.error('Error deleting demande:', error);
                Alert.alert('Erreur', 'Une erreur est survenue lors de la suppression de la demande');
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleAccept = (id) => {
    axios.put(`http://192.168.213.141:8099/api/demandes/${id}/accept`)
      .then(() => {
        fetchDemandes(); // Refresh the list after update
        Alert.alert('Succès', 'Demande acceptée avec succès');
      })
      .catch(error => {
        console.error('Error accepting demande:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'acceptation de la demande');
      });
  };

  const handleRefuse = () => {
    axios.put(`http://192.168.213.141:8099/api/demandes/${selectedDemande.id}/refus`, { causeRefus })
      .then(() => {
        fetchDemandes(); // Refresh the list after update
        setIsModalVisible(false);
        setSelectedDemande(null);
        setCauseRefus('');
        Alert.alert('Succès', 'Demande refusée avec succès');
      })
      .catch(error => {
        console.error('Error refusing demande:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors du refus de la demande');
      });
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.header}>Liste des demandes</Text>
      <FlatList
        data={demandes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Sujet: {item.sujet}</Text>
            <Text style={styles.label}>Description: {item.description}</Text>
            <Text style={styles.label}>État: {item.state}</Text>
            {item.state === 'Refusée' && <Text style={styles.label}>Cause de refus: {item.causeRefus}</Text>}
            <Text style={styles.label}>Écrit par: {item.eleve ? item.eleve.firstName + ' ' + item.eleve.lastName : 'Inconnu'}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleAccept(item.id)}>
                <Text style={styles.buttonText}>Accepter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.refuseButton]} onPress={() => {
                setSelectedDemande(item);
                setIsModalVisible(true);
              }}>
                <Text style={styles.buttonText}>Refuser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Cause de refus</Text>
            <TextInput
              style={styles.input}
              placeholder="Écrivez la cause du refus"
              value={causeRefus}
              onChangeText={setCauseRefus}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.submitButton]} onPress={handleRefuse}>
                <Text style={styles.buttonText}>Soumettre</Text>
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
  label: {
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
  acceptButton: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  refuseButton: {
    backgroundColor: '#ff9800',
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
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ff9800',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
});

export default DemandesListPage;
