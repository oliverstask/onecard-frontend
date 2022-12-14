import React from "react";
import { NativeBaseProvider, Box,Text, IconButton, Icon, View} from "native-base";
import * as RootNavigation from '../utils/RootNavigation'
import AppBar from "../components/AppBar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


export default function ContactScreen() {
  
  return (
  <>
  <AppBar screenName="Contacts"/>
  <SafeAreaView style={styles.container}>
    <Pressable
       style={styles.button}
      onPress={() => RootNavigation.navigate('Map')}
      >
      <IconButton icon={<Icon as={MaterialIcons} name="person" size="xs" color="white"/>} onPress={() => RootNavigation.navigate('Profile')} />
      <Text style={styles.textButton}>Map</Text>
    </Pressable>
  </SafeAreaView>
  
  </>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#EEF3F6',
  
  
  },
button: {
  alignItems: 'center',
  position: 'absolute',
    width: 90,
    height: 30,
    left: 274,
    top: 25,
    backgroundColor: '#5F038A',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
},
textButton: {
  fontFamily: 'Futura',
  height: 30,
  fontWeight: '600',
  fontSize: 16,
  color: 'white',
  
},
})