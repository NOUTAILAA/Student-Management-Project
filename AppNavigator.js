import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import HomeScreen from './screens/homescreen';
import Eleve from './screens/Eleve';
import ClassList from './screens/ClassList';
import AddClass from './screens/AddClass';
import AddGroupPage from './screens/AddGroup';
import GroupListPage from './screens/GroupList';
import EleveProfile from './screens/EleveProfile';
import DemandesListPage from './screens/DemandesListPage';
import MesDemandes from './screens/MesDemandes';
import StudentDetails from './screens/StudentDetails';
import EditStudent from './screens/EditStudent';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Eleve" component={Eleve} />
        <Stack.Screen name="class" component={ClassList} />
        <Stack.Screen name="AddClass" component={AddClass} />
        <Stack.Screen name="group" component={GroupListPage} />
        <Stack.Screen name="AddGroup" component={AddGroupPage} />
        <Stack.Screen name="EleveProfile" component={EleveProfile} />
        <Stack.Screen name="Demandes" component={DemandesListPage} />
        <Stack.Screen name="MesDemandes" component={MesDemandes} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen name="EditStudent" component={EditStudent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
