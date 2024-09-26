// EditGroupPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const EditGroupPage = ({ route }) => {
  const { groupId } = route.params;
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  const fetchGroupDetails = () => {
    axios.get(`http://192.168.213.141:8099/api/groupes/${groupId}`)
      .then(response => {
        const { name, description } = response.data;
        setGroupName(name);
        setGroupDescription(description);
      })
      .catch(error => {
        console.error('Error fetching group details:', error);
      });
  };

  const handleClose = () => {
    // Vous pouvez ajouter ici une logique pour revenir à la page précédente ou fermer la page modale.
  };

  const handleSubmit = () => {
    const updatedGroup = {
      name: groupName,
      description: groupDescription
    };

    axios.put(`http://192.168.213.141:8099/api/groupes/${groupId}`, updatedGroup)
      .then(response => {
        console.log('Group updated successfully:', response.data);
        // Vous pouvez ajouter une logique supplémentaire ici, comme naviguer vers la page de liste de groupes.
      })
      .catch(error => {
        console.error('Error updating group:', error);
      });
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 24 }}>Edit Group</Text>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={text => setGroupName(text)}
        style={{ marginBottom: 12, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
      />
      <TextInput
        placeholder="Group Description"
        value={groupDescription}
        onChangeText={text => setGroupDescription(text)}
        style={{ marginBottom: 12, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        multiline={true}
        numberOfLines={4}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Close" onPress={handleClose} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default EditGroupPage;
