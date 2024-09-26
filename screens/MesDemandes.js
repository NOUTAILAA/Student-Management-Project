import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const MesDemandes = ({ route }) => {
  const { eleve } = route.params || {};

  if (!eleve) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur: Élève non défini</Text>
      </View>
    );
  }

  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = () => {
    axios.get(`http://192.168.213.141:8099/api/eleves/${eleve.id}/demandes`)
      .then(response => {
        setDemandes(response.data);
      })
      .catch(error => {
        console.error('Error fetching demandes:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des demandes');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Demandes</Text>
      <FlatList
        data={demandes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.itemContainer,
            item.state === 'Refusée' && styles.refuseContainer,
            item.state === 'Acceptée' && styles.acceptContainer
          ]}>
            <Text style={[
              styles.label,
              item.state === 'Refusée' && styles.refuseLabel,
              item.state === 'Acceptée' && styles.acceptLabel
            ]}>Sujet: {item.sujet}</Text>
            <Text style={[
              styles.label,
              item.state === 'Refusée' && styles.refuseLabel,
              item.state === 'Acceptée' && styles.acceptLabel
            ]}>Description: {item.description}</Text>
            <Text style={[
              styles.label,
              item.state === 'Refusée' && styles.refuseLabel,
              item.state === 'Acceptée' && styles.acceptLabel
            ]}>État: {item.state}</Text>
            {item.state === 'Refusée' && <Text style={[styles.label, styles.refuseLabel]}>Cause de refus: {item.causeRefus}</Text>}
          </View>
        )}
      />
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
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'red',
  },
  itemContainer: {
    marginBottom: 16,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  refuseContainer: {
    backgroundColor: '#ffe6e6',
  },
  refuseLabel: {
    color: 'red',
  },
  acceptContainer: {
    backgroundColor: '#e6ffe6',
  },
  acceptLabel: {
    color: 'green',
  },
});

export default MesDemandes;
