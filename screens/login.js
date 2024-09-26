import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

const LoginPage = ({ navigation }) => {
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = () => {
    // Vérifier si l'utilisateur est un administrateur
    if (cin === 'admin' && password === 'admin123') {
      setAlertMessage('Hello Admin');
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        navigation.navigate('Eleve');
      }, 2000);
      return;
    }

    // Vérifier si l'utilisateur est enregistré dans la base de données
    axios.post('http://192.168.213.141:8099/api/eleves/login', { cin, password })
      .then(response => {
        // Si l'utilisateur est trouvé dans la base de données
        if (response.data) {
          const eleve = response.data;
          setAlertMessage(`Hello ${eleve.firstName} ${eleve.lastName}`);
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('EleveProfile', { eleve });
          }, 2000);
        } else {
          // Si l'utilisateur n'est pas trouvé, afficher une alerte d'erreur
          setAlertMessage('Error: User not found');
          setAlertVisible(true);
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setAlertMessage('Error: An error occurred while logging in');
        setAlertVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="CIN"
        value={cin}
        onChangeText={text => setCin(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Modal
        visible={alertVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.alertText}>{alertMessage}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setAlertVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    marginBottom: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  alertText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    width: '80%',
    paddingVertical: 10,
    backgroundColor: '#c3568965',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default LoginPage;
