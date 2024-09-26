import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbaar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => route.name === routeName;

  return (
    <View style={styles.navbar}>
    <TouchableOpacity
        style={[styles.navItem, isActive('EleveProfile') && styles.activeNavItem]}
        onPress={() => navigation.navigate('EleveProfile')}
      >
        <Text style={[styles.navText, isActive('EleveProfile') && styles.activeNavText]}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, isActive('MesDemandes') && styles.activeNavItem]}
        onPress={() => navigation.navigate('MesDemandes')}
      >
        <Text style={[styles.navText, isActive('MesDemandes') && styles.activeNavText]}>Voir mes demandes</Text>
      </TouchableOpacity>
    
      
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 10,
    justifyContent: 'space-around',
  },
  navItem: {
    padding: 10,
  },
  navText: {
    color: '#fff',
  },
  activeNavItem: {
    backgroundColor: '#555',
  },
  activeNavText: {
    color: '#90EE90',
  },
});

export default Navbaar;
