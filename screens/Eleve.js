import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isClassModalVisible, setIsClassModalVisible] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({
    cin: '',
    firstName: '',
    lastName: '',
    mdp: '',
  });
  const [errors, setErrors] = useState({
    cin: '',
    firstName: '',
    lastName: '',
    mdp: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchStudents();
    }
  }, [isFocused]);

  const fetchStudents = () => {
    setLoading(true);
    axios.get('http://192.168.213.141:8099/api/eleves')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios.get('http://192.168.213.141:8099/api/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://192.168.213.141:8099/api/groupes')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
      });
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!newStudent.cin) newErrors.cin = 'CIN est requis';
    if (!newStudent.firstName) newErrors.firstName = 'Prénom est requis';
    if (!newStudent.lastName) newErrors.lastName = 'Nom est requis';
    if (!newStudent.mdp) newErrors.mdp = 'Mot de passe est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const assignClass = () => {
    if (selectedStudent && selectedClass) {
      axios.put(`http://192.168.213.141:8099/api/eleves/${selectedStudent.id}/classe/${selectedClass.id}`)
        .then(response => {
          console.log('Class assigned successfully:', response.data);
          setIsClassModalVisible(false);
          fetchStudents(); // Re-fetch students to see updates
        })
        .catch(error => {
          console.error('Error assigning class:', error);
        });
    }
  };

  const assignGroup = () => {
    if (selectedStudent && selectedGroup) {
      axios.put(`http://192.168.213.141:8099/api/eleves/${selectedStudent.id}/groupe/${selectedGroup.id}`)
        .then(response => {
          console.log('Group assigned successfully:', response.data);
          setIsGroupModalVisible(false);
          fetchStudents(); // Re-fetch students to see updates
        })
        .catch(error => {
          console.error('Error assigning group:', error);
        });
    }
  };

  const addStudent = () => {
    if (validateFields()) {
      axios.post('http://192.168.213.141:8099/api/eleves', newStudent)
        .then(response => {
          console.log('Student added successfully:', response.data);
          setStudents([...students, response.data]);
          setIsAddStudentModalVisible(false);
          setNewStudent({ cin: '', firstName: '', lastName: '', mdp: '' });
          setErrors({ cin: '', firstName: '', lastName: '', mdp: '' });
        })
        .catch(error => {
          console.error('Error adding student:', error);
        });
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('StudentDetails', { student: item })}
    >
      <Text style={styles.label}>CIN: {item.cin}</Text>
      <Text style={styles.label}>First Name: {item.firstName}</Text>
      <Text style={styles.label}>Last Name: {item.lastName}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => {
            setSelectedStudent(item);
            setIsClassModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Assigner Classe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => {
            setSelectedStudent(item);
            setIsGroupModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Assigner Groupe</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.header}>Student List</Text>
      <FlatList
        data={currentStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudentItem}
      />
      <View style={styles.paginationContainer}>
        <Button title="Précédent" onPress={handlePreviousPage} disabled={currentPage === 1} />
        <Button title="Suivant" onPress={handleNextPage} disabled={indexOfLastStudent >= students.length} />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddStudentModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Ajouter un élève</Text>
      </TouchableOpacity>

      {/* Modal pour assigner la classe */}
      <Modal
        visible={isClassModalVisible}
        transparent={true}
        onRequestClose={() => setIsClassModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Sélectionner une classe :</Text>
            <FlatList
              data={classes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => setSelectedClass(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Assigner" onPress={assignClass} />
              <Button title="Fermer" onPress={() => setIsClassModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal pour assigner le groupe */}
      <Modal
        visible={isGroupModalVisible}
        transparent={true}
        onRequestClose={() => setIsGroupModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Sélectionner un groupe :</Text>
            <FlatList
              data={groups}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => setSelectedGroup(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Assigner" onPress={assignGroup} />
              <Button title="Fermer" onPress={() => setIsGroupModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal pour ajouter un élève */}
      <Modal
        visible={isAddStudentModalVisible}
        transparent={true}
        onRequestClose={() => setIsAddStudentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Ajouter un élève</Text>
            <TextInput
              style={styles.input}
              placeholder="CIN"
              value={newStudent.cin}
              onChangeText={(text) => setNewStudent({ ...newStudent, cin: text })}
            />
            {errors.cin ? <Text style={styles.errorText}>{errors.cin}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={newStudent.firstName}
              onChangeText={(text) => setNewStudent({ ...newStudent, firstName: text })}
            />
            {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={newStudent.lastName}
              onChangeText={(text) => setNewStudent({ ...newStudent, lastName: text })}
            />
            {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={newStudent.mdp}
              secureTextEntry
              onChangeText={(text) => setNewStudent({ ...newStudent, mdp: text })}
            />
            {errors.mdp ? <Text style={styles.errorText}>{errors.mdp}</Text> : null}
            <View style={styles.modalButtonContainer}>
              <Button title="Ajouter" onPress={addStudent} />
              <Button title="Fermer" onPress={() => setIsAddStudentModalVisible(false)} />
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
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  assignButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginTop: 20,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
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
  modalItem: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default StudentList;
