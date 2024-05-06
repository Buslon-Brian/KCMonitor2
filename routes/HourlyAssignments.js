import {View, Text, TouchableOpacity, Modal} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import { Feather } from '@expo/vector-icons';
import styles from '../components/styles';
import Header_c from '../components/Header';
import SubmitBttnfn from '../components/SubmitBttn';
import KeepState from '../components/KeepState';

export default function Hourly({navigation}){
    const snap = useSnapshot(store)
    const [position, setPosition] = useState(snap.cur_assign)
    const [isModalVisible, setModalVisible] = useState(false)
    const toggleModal = () => {setModalVisible(!isModalVisible)}
        
    const handleHourPress = (position) => {
        toggleModal()
        store.cur_assign = position
    }

    const handleOkPress = () => {
        toggleModal()
        setPosition(snap.cur_assign)
        log_assign(snap)
    }

    const handleCancelPress = () => {toggleModal()}
    

    KeepState()
    return (
        <SafeAreaProvider>

            <Header_c title = "Property Rounds" navigation = {navigation}/>

            <View style = {{backgroundColor: '#25292e', flex: 1}}>

                <View style = {{flex: .1, justifyContent: 'center'}}> 
                    <Text style ={styles.text_medium}> Select an hourly assignment</Text>
                </View>
            
                {HourlyButtons(handleHourPress)}
            
                <View style = {{flex: .4}}>
                    <Text style = {[styles.text_medium, {marginVertical: 30, marginHorizontal: 10}]}> Current Position: {position} </Text>
                    {Popup(isModalVisible, toggleModal, handleOkPress, handleCancelPress)}
                </View>

            </View>
        </SafeAreaProvider>
    )
}

function HourlyButtons(handleHourPress) {
    return <View style={{ flex: .3, flexDirection: 'row' }}>
        <TouchableOpacity
            style={{ backgroundColor: '#333940', marginHorizontal: 10, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            onPress={() => handleHourPress('Floater')}
        >
            <Feather name="slack" size={100} color="white" />
            <Text style={{ color: 'white', fontSize: 22, marginVertical: 15 }}> Floater </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: '#333940', marginHorizontal: 10, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            onPress={() => handleHourPress('Headcounts')}
        >
            <Feather name="users" size={100} color="white" />
            <Text style={{ color: 'white', fontSize: 25, margin: 15 }}> Headcounts </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: '#333940', marginHorizontal: 10, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            onPress={() => handleHourPress('Kiosk')}
        > 
            <Feather name="pen-tool" size={100} color="white" />
            <Text style={{ color: 'white', fontSize: 25, margin: 15 }}> Kiosk </Text>
        </TouchableOpacity>
    </View>;
}

function Popup(isModalVisible, toggleModal, handleOkPress, handleCancelPress) {
    const snap = useSnapshot(store);
    const cur_assign = snap.cur_assign;
  
    return (
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  
          <View style={{ ...styles.overlay, backgroundColor: isModalVisible ? 'rgba(0, 0, 0, 0.7)' : 'transparent' }} />
  
          <View style={{ backgroundColor: '#25292e', width: '66%', height: '25%', margin: '100', flexDirection: 'column' }}>
            
            <View style={{ flex: 1, padding: 5 }}>
              <Text style={{ color: 'white', fontSize: 22 }}> You are about to set your hourly assignment to:</Text>
            </View>
  
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 22 }}> {cur_assign} </Text>
            </View>
  
           
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ flex: 1, color: 'white', backgroundColor: snap.color, margin: 5, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => handleOkPress()}
              >
                <Text style = {{color: 'white'}}> OK </Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={{ flex: 1, color: 'white', backgroundColor: '#333940', margin: 5, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => handleCancelPress()}
              >
                <Text style = {{color: 'white'}}> Cancel </Text>
              </TouchableOpacity>
            </View>
          
          </View>

        </View>

      </Modal>
    );
}
  
function log_assign(snap) {
  console.log("exec")
  fetch(process.env.EXPO_PUBLIC_HRLYTOKEN, {
    method: "POST",
    body: JSON.stringify({
     "text": `${snap.username} is on ${snap.cur_assign}`
    })
    });
}