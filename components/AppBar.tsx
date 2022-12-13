import React from "react";
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar, Pressable} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import ProfileScreen from "../screens/ProfileScreen";
import * as RootNavigation from '../utils/RootNavigation'


export default function AppBar({screenName}:{screenName:string}) {

    return <>
  
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="fffff" />
      <HStack bg="white" px="1" py="3" justifyContent="space-between" alignItems="center" width={"100%"} maxW="380">
        <HStack alignItems="center">
          <Text color="black" fontFamily="Futura-Medium"  fontSize="30">
            {screenName}
          </Text>
        </HStack>
        <HStack>
        
       <IconButton icon={<Icon as={MaterialIcons} name="person" size="8" color="black"/>} onPress={() => RootNavigation.navigate('Profile')} />
      
      

        
      
          
        </HStack>
      </HStack>
     
    </>;
  }