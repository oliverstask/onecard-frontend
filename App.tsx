import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import SignupScreen from './screens/SignupScreen';
import ScanScreen from './screens/ScanScreen';
import ProfileScreen from './screens/ProfileScreen';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook'
import { faQrcode} from '@fortawesome/free-solid-svg-icons/faQrcode'

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import user from './reducers/user';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import AppBar from './components/AppBar';
import { NativeBaseProvider } from 'native-base';
import { navigationRef } from './utils/RootNavigation';



export type StackParamList = {
  Signup: undefined;
  TabNavigator: undefined;
  Home: undefined;
  Profile: undefined;
};
export type BottomParamList = {
  Home: undefined;
  Scan: undefined;
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
const customTabBarStyle = {
  allowFontScaling: true,
  labelStyle: { fontSize: 16, paddingTop: 5 },
  tabStyle: { paddingTop: 5 },
  style: { height: 60, borderTopColor: "#5F038A" },
}
const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarOptions: {
        showLabel:false,
        customTabBarStyle
      },
      tabBarIcon: ({ color, size }) => {
        let iconName:IconDefinition|null = null;

        if (route.name === "Contact") {
          iconName = faAddressBook;
        } else if (route.name === "Home") {
          iconName = faHouse;
        } else if (route.name === "Scan") {
          iconName = faQrcode;
        }

        return !!iconName && <FontAwesomeIcon icon={iconName} size={size} color={color} />; 
      },
      tabBarActiveTintColor: "#5F038A",
      tabBarInactiveTintColor: "#b2b2b2",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Scan" component={ScanScreen} />
    <Tab.Screen name="Contact" component={ContactScreen} options={{tabBarLabel: 'Activity',
          }}/>
    
    
  </Tab.Navigator>  
  );
};


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
        <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='Signup' screenOptions={{headerShown: false}}>
        <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={{headerShown: false}}/>
        <Stack.Screen
        name='TabNavigator'
        component={TabNavigator}
        options={{headerShown: false}}/>
        <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{headerShown: false}}/>
        </Stack.Navigator>
       </NavigationContainer>
       </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}


const styles = StyleSheet.create({
 contact : {
  height: 90,
    width: 90,
 },
})

