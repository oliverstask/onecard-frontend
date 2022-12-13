import { Button, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';

export default function ProfileScreen() {
 return (
   <>
    <AppBar screenName='Profile' />
     <Text>Home Screen</Text>
     <Button
       title="Go to Contact"
       
     />
   </>
 );
}