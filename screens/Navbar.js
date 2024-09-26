import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => route.name === routeName;

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[styles.navItem, isActive('Eleve') && styles.activeNavItem]}
        onPress={() => navigation.navigate('Eleve')}
      >
        <Text style={[styles.navText, isActive('Eleve') && styles.activeNavText]}>STUDENT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, isActive('class') && styles.activeNavItem]}
        onPress={() => navigation.navigate('class')}
      >
        <Text style={[styles.navText, isActive('class') && styles.activeNavText]}>CLASS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, isActive('group') && styles.activeNavItem]}
        onPress={() => navigation.navigate('group')}
      >
        <Text style={[styles.navText, isActive('group') && styles.activeNavText]}>GROUP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, isActive('Demandes') && styles.activeNavItem]}
        onPress={() => navigation.navigate('Demandes')}
      >
        <Text style={[styles.navText, isActive('Login') && styles.activeNavText]}>Demande</Text>
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
    color: '#590',
  },
});

export default Navbar;
