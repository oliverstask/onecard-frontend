import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import SignupScreen from './screens/SignupScreen';
import ScanScreen from './screens/ScanScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import DetailsScreen from './screens/DetailsScreen'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook'
import { faQrcode} from '@fortawesome/free-solid-svg-icons/faQrcode'
import { MaterialIcons } from "@expo/vector-icons";



import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import auth from './reducers/auth';
import qr from './reducers/qr';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import AppBar from './components/AppBar';
import { Icon, IconButton, NativeBaseProvider } from 'native-base';
import { navigationRef } from './utils/RootNavigation';
import { useFonts } from 'expo-font'


export type StackParamList = {
  Signup: undefined;
  TabNavigator: undefined;
  Home: undefined;
  Details: undefined;
};
export type BottomParamList = {
  Home: undefined;
  Scan: undefined;
  Contact: undefined;
  Profile: undefined;
  Map: undefined;
  Signup: undefined;
};

const store = configureStore({
  reducer: {user, auth, qr}
})



const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<BottomParamList>();



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
        customTabBarStyle,
      },
      tabBarIcon: ({ color, size}) => {
        let iconName:IconDefinition|null = null;

        if (route.name === "Contact") {
          iconName = faAddressBook;
        } else if (route.name === "Home") {
          iconName = faHouse;
        } else if (route.name === "Scan") {
          
        }

        return !!iconName && <FontAwesomeIcon icon={iconName} size={size} color={color} />; 
      },
      tabBarActiveTintColor: "#5F038A",
      tabBarInactiveTintColor: "#b2b2b2",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen}/>
    {/* @ts-ignore */}
    <Tab.Screen name="Scan" component={ScanScreen} 
    options={{tabBarLabel:'',
      tabBarIcon:({ color, size}) => <Icon as={MaterialIcons} name="qr-code-scanner" size="50" color="white"/>,
      tabBarIconStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10,
        width:80,
        top:5,
    }, 
    tabBarItemStyle:{
        backgroundColor: '#5F038A',
        maxWidth:80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:40,
        bottom: 30,
        height:80,
    }}} />
    <Tab.Screen name="Contact" component={ContactScreen} options={{tabBarLabel: 'Activity'}}/>
    <Tab.Screen name='Profile' component={ProfileScreen} options={{headerShown: false, tabBarItemStyle:{display:'none'}}} />
    <Tab.Screen name='Map' component={MapScreen} options={{headerShown: false, tabBarItemStyle:{display:'none'}}}/>
    
    
  </Tab.Navigator>  
  );
};


export default function App() {
  const [fontsLoaded] = useFonts({
    'Futura': require('./assets/fonts/Futura-Medium.otf'),
    'Futura-Medium': require('./assets/fonts/Futura-Medium.otf')
  })

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
        <NativeBaseProvider>
        <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='Signup' screenOptions={{headerShown: false}}>
        
        <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={{headerShown: false}}/>
        <Stack.Screen 
        name='Details'
        component={DetailsScreen}
        options={{headerShown: true}}
        />
        <Stack.Screen
        name='TabNavigator'
        component={TabNavigator}
        options={{headerShown: false}}/>
        
        </Stack.Navigator>
       </NavigationContainer>
       </NativeBaseProvider>
    </Provider>
  );
}


const styles = StyleSheet.create({
 contact : {
  height: 90,
    width: 90,
 },
})

