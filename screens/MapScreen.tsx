import { StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import * as Location from 'expo-location';
import * as RootNavigation from '../utils/RootNavigation'
import MapView, { Callout, LatLng, Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { AuthState } from '../reducers/auth';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { Popover, Button} from 'native-base';




export default function MapScreen() {

  const [currentPosition, setCurrentPosition] = useState<LatLng>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [contactName, setContactName] = useState<string[]>([]);
  const [ newMap, setNewMap] = useState<LatLng[]>([]);
  const [ newQrId, setNewQrId] = useState<string[]>([])
  const [ newDate, setNewDate ] = useState<string>('')
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location?.coords);
          });
      }
    })();
  }, []);

  useEffect(() => {
    fetch(`https://onecard-backend.vercel.app/transactions/${userId}`)
    .then(response => response.json())
    .then(data => {
      if (data) {
        console.log(data)
         data.response.forEach((element:any) => {
        //  
         const oDate = element.transaction.date
            
           setNewMap([...newMap, {longitude:element.transaction.location.lon, latitude:element.transaction.location.lat}])
           setContactName([...contactName, `${element.contactName.firstName} ${element.contactName.lastName}`])
           setNewQrId([...newQrId, `${element.transaction._id}`])
           setNewDate(element.transaction.date)
          })
        // });
      }
    })
  },[]);
  
  
 
  const markers = newMap.map((e,i) => {
    return (
      <Marker pinColor={'random'}
        coordinate={{ latitude: e.latitude, longitude: e.longitude }}
        title={contactName[i]} 
        // onPress={() => RootNavigation.navigate('Details', {newQrId})}
        >
          <Callout>
            <View>
              <Text style={styles.textButton1}>{contactName[i]}</Text>
              <Text>You've met on the {new Date(newDate).toLocaleDateString()} </Text>
              <Button style={styles.button1} onPress={() => RootNavigation.navigate('Details', {newQrId})}>Contact details</Button>
            </View>
          </Callout>
        </Marker>
    )
  })

  return (
    <>
    <AppBar screenName='Map' />
    <View style={styles.container} >
      

      <MapView style={styles.map}>
        {markers}
      </MapView>
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