
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function SignupScreen({
  route, navigation,
}: NativeStackScreenProps<StackParamList, "Signup">) {
 return (
   <View>
     <Text>Signup Screen</Text>
     <Button
       title="Go to Home"
       onPress={() => navigation.navigate('TabNavigator')}
     />
   </View>
 );
}