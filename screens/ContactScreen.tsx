import React, { useState } from "react";
import { NativeBaseProvider, Box,Text, IconButton, Icon, View, ScrollView, Modal, Button, Radio} from "native-base";
import * as RootNavigation from '../utils/RootNavigation'
import AppBar from "../components/AppBar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Contact from "../components/Contacts";
import { BlurView} from "expo-blur";

export default function ContactScreen() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("one");
  
 


  return (
  <>
  <AppBar screenName="Contacts"/>
  <Button onPress={() => setOpen(true)} size="sm" width="20%" height="5%">
  <Icon as={MaterialIcons} name="filter-alt" size="10" color="#0F2E3A"/>
  </Button>
  <SafeAreaView style={styles.container}>
    <Pressable
       style={styles.button}
      onPress={() => RootNavigation.navigate('Map')}
      >
      <IconButton icon={<Icon as={MaterialIcons} name="location-pin" size="4" color="white"/>}/>
      <Text style={styles.textButton}>Map</Text>
    </Pressable>

    <ScrollView showsVerticalScrollIndicator={false}>
            <Contact />
          </ScrollView>
          
  </SafeAreaView>
  {open && <BlurView style={styles.absolute}/>}
  <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true} alignItems='flex-start' height="100%" width="100%" _backdrop={{bg: "rgba(0, 0, 0, 0.8)"}}>
  
  <Modal.Content maxWidth="500" height="100%" >
    <Modal.CloseButton />
    <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
setValue(nextValue);
}}>
<Radio value="one" my={1}>
  One
</Radio>
<Radio value="two" my={1}>
  Two
</Radio>
</Radio.Group>;
  </Modal.Content>
  
</Modal>
  </>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#EEF3F6',
  
  
  },
button: {
    flexDirection: 'row',
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
  paddingTop: 3
},
absolute: {
  position:"absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  
}
})