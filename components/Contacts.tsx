import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { NativeBaseProvider, Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center, ScrollView, FlatList} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { AuthState } from '../reducers/auth'


export default function Contact() {

  const [contactData, setContactData] = useState<any[]>([]);

  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId)
  useEffect(() => {
    
    (async () => {
      //console.log(userId)
      fetch(`https://onecard-backend.vercel.app/transactions/${userId}`)
    
    .then(response => response.json())
    .then(data => { 
      setContactData(data.contacts)
    });
  })();
  }, []);

  
     
    
    

 
    
    /*const contactList = contactData.map((e:any, i:number) => {
      return (
        <Box borderBottomWidth="1" _dark={{
          borderColor: "muted.50"
        }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar size="48px" source={{
                  uri: e.avatarUrl
            }} />
                  <VStack>
                    <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                      {e.userId.firstName} {e.userId.lastName}
                    </Text>
                    <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                      {e._id}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text fontSize="xs" _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" alignSelf="flex-start">
                    {e.date}
                  </Text>
                </HStack>
              </Box>
      )
    })*/
  
    /*const onRowDidOpen = rowKey => {
      //console.log('This row opened', rowKey);
    };*/
    
    /*onst strAscending = [...data].sort((a, b) =>
    a.fullName > b.fullName ? 1 : -1,
  );
  const sortedEvents = data.slice().sort((a, b) => a.timeStamp - b.timeStamp);*/

    // const renderItem = ({
    //   item,
    //   index,
    // }:{
    //   item:any,
    //   index:number,
    // }) => <Box>
    //       <Pressable onPress={() => setOpen(true)} _dark={{
    //       bg: 'coolGray.800'
    //     }} _light={{
    //       bg: 'white'
    //     }}>
    //         <Box pl="4" pr="5" py="2">
    //           <HStack alignItems="center" space={3}>
    //             <Avatar size="48px" source={{
    //             uri: item.avatarUrl
    //           }} />
    //             <VStack>
    //               <Text color="coolGray.800" _dark={{
    //               color: 'warmGray.50'
    //             }} bold>
    //                 {item.fullName}
    //               </Text>
    //               <Text color="coolGray.600" _dark={{
    //               color: 'warmGray.200'
    //             }}>
    //                 {item.recentText}
    //               </Text>
    //             </VStack>
    //             <Spacer />
    //             <Text fontSize="xs" color="coolGray.800" _dark={{
    //             color: 'warmGray.50'
    //           }} alignSelf="flex-start">
    //               {item.timeStamp}
    //             </Text>
    //           </HStack>
    //         </Box>
    //       </Pressable>
    //     </Box>;
  
    
  
   /* return <Box bg="red" safeArea flex="1">
        <SwipeListView  renderItem={contactList} />
      </Box>;*/


      return <Box top="10">
      <FlatList data={contactData} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "muted.50"
    }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar size="48px" source={{
          uri: item.avatarUrl
        }} />
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.userId.firstName} {item.userId.lastName}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item._id}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.date}
              </Text>
            </HStack>
          </Box>} keyExtractor={item => item.id} />
    </Box>;
};
