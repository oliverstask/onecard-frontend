import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import SignupScreen from './screens/SignupScreen';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import user from './reducers/user';
import FontAwesome from "react-native-vector-icons/FontAwesome";


export type StackParamList = {
  Signup: undefined;
  TabNavigator: undefined;
  Home: undefined;
};
export type BottomParamList = {
  Home: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<BottomParamList>();

const reducers = combineReducers({user});
const persistConfig = {
  key: 'oneCard', 
  storage: AsyncStorage
};
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false }),
});
const persistor = persistStore(store);

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "";

        if (route.name === "Contact") {
          iconName = "address-book";
        } else if (route.name === "Home") {
          iconName = "house";
        }

        return <FontAwesome name={iconName} size={size} color={color} />; 
      },
      tabBarActiveTintColor: "#5F038A",
      tabBarInactiveTintColor: "#b2b2b2",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Contact" component={ContactScreen} />
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>  
  );
};


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Signup' screenOptions={{headerShown: false}}>
        <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={{headerShown: false}}/>
        <Stack.Screen
        name='TabNavigator'
        component={TabNavigator}
        options={{headerShown: false}}/>
        </Stack.Navigator>
       </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


