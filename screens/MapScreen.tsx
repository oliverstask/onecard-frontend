import { StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import * as Location from 'expo-location';
import * as RootNavigation from '../utils/RootNavigation'
import MapView from "react-native-map-clustering";
import { Callout, LatLng, Marker, Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { AuthState } from '../reducers/auth';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { Popover, Button, HStack, Spinner, Heading} from 'native-base';

const INITIAL_LOCATION = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 1,
  longitudeDelta: 1,
}

export default function MapScreen() {
  
  const [currentPosition, setCurrentPosition] = useState<LatLng>({latitude:0,longitude:0});
  const [isModalVisible, setModalVisible] = useState(false);
  const [ contactData, setContactData] = useState<any[]>([]);
  const [ newQrId, setNewQrId] = useState<string[]>([])
  const [ newDate, setNewDate ] = useState<string[]>([])
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        INITIAL_LOCATION.latitude = location.coords.latitude
        INITIAL_LOCATION.longitude = location.coords.longitude
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location?.coords);
          });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
    const getTransactions = await fetch(`https://onecard-backend.vercel.app/transactions/${userId}`)
    const transactionData = await getTransactions.json()
    setContactData(transactionData.response)
  })();

  }, []);
 
  const markers = contactData.map((e,i) => {
    return (
      <Marker pinColor={'random'} key={i}
        coordinate={{ latitude: e.transaction.location.lat, longitude: e.transaction.location.lon }}
        // onPress={() => RootNavigation.navigate('Details', {newQrId})}
        >
          <Callout>
            <View>
              <Text style={styles.textButton1}>{e.contactName.firstName} {e.contactName.lastName}</Text>
              <Text>You've met on the {new Date(e.transaction.date).toLocaleDateString()} </Text>
              <Button style={styles.button1} onPress={() => RootNavigation.navigate('Details', {qrId:e.transaction.qrId._id})}>Contact details</Button>
            </View>
          </Callout>
        </Marker>
    )
  })



  return (
    <>
    <AppBar screenName='Map' />
    <View style={styles.container} >
      
      {
        INITIAL_LOCATION.longitude === 0 &&
        <HStack space={2} justifyContent="center" alignItems='center' marginTop='250'>
      <Spinner accessibilityLabel="Loading posts" color='#5F038A' size="lg"/>
      <Heading color="black" fontSize="md" fontFamily='Futura' fontWeight='600'>
        Your Map is loading
      </Heading>
    </HStack>
      }
      { INITIAL_LOCATION.longitude !== 0 &&
        <MapView style={styles.map}
          initialRegion={INITIAL_LOCATION}
        >
          {markers}
        </MapView>
      }
    </View>
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.centeredView} >
          
          <View style={styles.modalView}>
            <Text style={styles.input}>Contact</Text> 
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  map: {
    flex: 1,
    borderRadius: 20
  },
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 150,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: 150,
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
  button1: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    marginTop: 20,
    width: 235,
    height: 40,
    backgroundColor: '#5F038A',
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  textButton1: {
    color: 'black',
    fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
      }
});