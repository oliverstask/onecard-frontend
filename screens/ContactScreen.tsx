import React, { useState, useEffect } from "react";
import { Text, IconButton, Icon, View, Modal, Radio, Input, Box, FlatList, HStack, Avatar, VStack, Spacer} from "native-base";
import * as RootNavigation from '../utils/RootNavigation'
import AppBar from "../components/AppBar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView} from "expo-blur";
import { useSelector } from 'react-redux';
import { AuthState } from '../reducers/auth';

export default function ContactScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("one");
  const [contactData, setContactData] = useState<any[]>([]);
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId);

    const fetchContactList = async() => {
      const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId)
      const response = await fetch(`https://onecard-backend.vercel.app/transactions/${userId}`)
      const contactInfos = await response.json()
      //console.log(e.userId)
      const dataArr = contactInfos.contacts.map((e:any, i:any)=> {
        const {firstName, lastName} = e.userId
        const {qrName} = e.qrId
        const fullName = [firstName, lastName].join(' ')
        return {id: i, fullName, recentText: qrName, avatarUrl: 'testurl'}
      })
    }
  

  useEffect(() => {
    (async () => {
      
      fetch(`https://onecard-backend.vercel.app/transactions/${userId}`)
    
    .then(response => response.json())
    
    .then(data => {
      if (data) {
        data.contacts.forEach((element:any) => {
          fetch(`https://onecard-backend.vercel.app/qrs/qr/${element.qrId._id}`)
          .then(response => response.json())
          .then(qrData => {
            console.log(qrData)
            const contact = {
              id: element.qrId._id,
              firstName: qrData.responseArr.find((o:any) => !!o['firstName'])['firstName'],
              lastName: qrData.responseArr.find((o:any) => !!o['lastName'])['lastName'],
              date: element.date
            }
            setContactData([...contactData, contact])
          })
        });
      }
    })
    
  })();
  
  }, []);
  
  

  const handleSearch = (text:any) => {
    setSearchTerm(text);
  };

  const filteredContacts = contactData.filter((e) =>
    e.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <FlatList  data={filteredContacts} renderItem={({item}) => {
          
          
          return(<Pressable onPress={()=> RootNavigation.navigate('Details', {qrId: item.id})}>
           <Box borderBottomWidth="1"
            borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
              <HStack space={[2, 3]} justifyContent="space-between">
                 <Avatar size="48px" source={{
                         uri: item.avatarUrl
                  }} />
                    <VStack>
                      <Text color="coolGray.800" top="3.5" fontSize="15">
                        {item.firstName} {item.lastName}
                      </Text>
                       
                     </VStack>
                  <Spacer />
              <Text fontSize="xs"color="coolGray.800" alignSelf="flex-start">
                {`${new Date(item.date).toLocaleDateString()} ${new Date(item.date).toLocaleTimeString()}`}
              </Text>
            </HStack>
          </Box>
          </Pressable>)} }keyExtractor={item => item.id} />
    </Box>
          
            </View>
  </SafeAreaView>
  {open && <BlurView style={styles.absolute} />}
  <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true} alignItems='flex-start' height="100%" width="100%" >
  
  <Modal.Content  height="100%" top='4%'>
   
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
  top: 50
  
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
}
})