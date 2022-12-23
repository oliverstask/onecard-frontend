import React, { useState, useEffect, useCallback } from "react";
import { Text, IconButton, Icon, View, Modal, Radio, Input, Box, FlatList, HStack, Avatar, VStack, Spacer, ScrollView} from "native-base";
import * as RootNavigation from '../utils/RootNavigation'
import AppBar from "../components/AppBar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView} from "expo-blur";
import { useSelector } from 'react-redux';
import { AuthState } from '../reducers/auth';
import { RadioButton } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native'

export default function ContactScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("one");
  const [contactData, setContactData] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState<'alphabetical'|'date'>('date');
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const getTransactions = await fetch(`https://onecard-backend.vercel.app/transactions/${userId}`)
        const transactionData = await getTransactions.json()
        setContactData(transactionData.response)
      })();
    }, [])
  );
  

  
    const handleSortPress = (value:any) => {
      setSortOption(value);
    };
 

  const handleSearch = (text:any) => {
    setSearchTerm(text);
  };
  
   let filteredContacts = contactData.filter((e) =>
     e.contactName.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     e.contactName.lastName.toLowerCase().includes(searchTerm.toLowerCase())
   );

//   filteredContacts = 
//   (order === 'az' ? filteredContacts.sort((a,b)=>{
//     if(a.firstName > b.firstName){
//         return 1;
//     }
//     if(a.firstName < b.firstName){
//         return -1;
//     }
//     return 0;
// }) : 
// filteredContacts.sort((date1, date2) => new Date(date1).setHours(0, 0, 0, 0) - new Date(date2).setHours(0, 0, 0, 0)))

if (sortOption === 'alphabetical') {
  filteredContacts.sort((a,b)=>{
         if(a.contactName.firstName > b.contactName.firstName){
             return 1;
         }
         if(a.contactName.firstName < b.contactName.firstName){
             return -1;
         }
       return 0;
     })
} else if (sortOption === 'date') {
  filteredContacts.sort((a, b) => {
    
    const dateA: any = new Date(a.transaction.date);
    const dateB: any = new Date(b.transaction.date);
  
    
    return dateB - dateA;
  });
}



  return (
  <>
  <AppBar screenName="Contacts"/>

  
 
  <SafeAreaView style={styles.container}>
    <View style={styles.options}>
      <Pressable
        style={styles.button2}
        onPress={() => setOpen(true)}
        >
          <Icon as={MaterialIcons} 
            name="filter-alt" 
            size="6" 
            color="#285D73"/>
              <Text style={styles.textButton2}>
                Sort
              </Text>
      </Pressable>
                <Input placeholder="Search" 
                variant="filled" 
                width="55%" 
                height={"98%"} 
                borderRadius="5" 
                py="1" 
                px="2"
                backgroundColor={"white"}
                borderColor={"#285D73"}
                color="#788F99"
                fontSize={15}
                bottom={"167%"}
                left={"10%"}
                InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} 
                onChangeText={handleSearch}
                value={searchTerm}    />
  </View>
  
  <Pressable
    style={styles.button}
    onPress={() => RootNavigation.navigate('Map')}
  >
      <IconButton 
        icon={<Icon as={MaterialIcons} 
        name="location-pin" 
        size="4" 
        color="white"/>}/>
          <Text style={styles.textButton}>
            Map
          </Text>
  </Pressable>
  <View bottom='10'>
    <Box top="10">
    
      <FlatList  data={filteredContacts}  renderItem={({item}) => {
          
          
          return(<Pressable onPress={()=> RootNavigation.navigate('Details', {qrId: item.transaction.qrId._id})}>
           <Box borderBottomWidth="1"
            borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
              <HStack space={[2, 3]} justifyContent="space-between">
                 <Avatar size="48px" source={{
                         uri: item.contactName.photo
                  }} />
                    <VStack style={styles.contactText}>
                      <Text color="coolGray.800" fontSize="15">
                        {item.contactName.firstName} {item.contactName.lastName} 
                      </Text>
                      <Text style={styles.qrName}>   ( {item.transaction.qrId.qrName} )</Text>
                     </VStack>
                  <Spacer />
              <Text fontSize="xs"color="coolGray.800" alignSelf="flex-start">
                {`${new Date(item.transaction.date).toLocaleDateString()} ${new Date(item.transaction.date).toLocaleTimeString()}`}
              </Text>
            </HStack>
          </Box>
          </Pressable>)} }keyExtractor={item => item.transaction._id} />
    </Box>
          
            </View>
  </SafeAreaView>
  {open && <BlurView style={styles.absolute} />}
  <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true} height="20%" width="50%" >
  
  <Modal.Content  height="100%" top='100%'>
   
  <Radio.Group name="myRadioGroup" onChange={handleSortPress} value={sortOption}>
       
          <Radio value="alphabetical" colorScheme="emerald" my={1}>
          A-Z
          </Radio>
          <Radio value="date" colorScheme="purple" my={1}>
          Date
          </Radio>
      
      </Radio.Group>
  </Modal.Content>
  
</Modal>
  </>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#EEF3F6',
  top: 50,
  marginBottom: 60
  
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
button2 : {
  flexDirection: 'row',
  alignItems: 'center',
  width: 122,
  height: 41,
  left: 20,
  bottom: 70,
  backgroundColor: '#white',
  borderWidth: 1,
  borderColor: '#285D73',
  borderRadius: 5,
},
textButton: {
  fontFamily: 'Futura',
  height: 30,
  fontWeight: '600',
  fontSize: 16,
  color: 'white',
  paddingTop: 3
},
textButton2: {
  fontFamily: 'Futura',
  height: 30,
  fontWeight: '600',
  fontSize: 16,
  color: '#285D73',
  paddingTop: 3
},
absolute: {
  position:"absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  
},
options:{
  flexDirection: 'row'
},
contactText:{
  flexDirection: 'row',
  alignItems: 'center'
},
qrName: {
  color: '#788F99'
}
})