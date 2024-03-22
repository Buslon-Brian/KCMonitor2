import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "../components/styles"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import Header_c from '../components/Header';
import KeepState from '../components/KeepState';

export default function Keys({navigation}){
    const snap = useSnapshot(store)
    const [key, setKey] = useState(snap.cur_keys)
    const [isModalVisible, setModalVisible] = useState(false)
    const toggleModal = () => {setModalVisible(!isModalVisible)}
        
    const handleKeyPress = (key) => {
        toggleModal()
        store.cur_keys = key
    }

    const handleOkPress = () => {
        toggleModal()
        setKey(snap.cur_keys)
        log_keys(snap)
        navigation.navigate('Menu')
    }

    const handleCancelPress = () => {toggleModal()}
    return (
        <SafeAreaProvider>
            <Header_c title = "Keys" navigation = {navigation}/>
            
            <View style = {{backgroundColor: '#25292e', flex: 1}}>
                <View style = {{flex: .1, justifyContent: 'center'}}> 
                    <Text style ={styles.text_medium}> Select a Key Set</Text>
                </View>
                
                {KeyButtons(handleKeyPress)}

                <View style = {{flex: .4}}>
                    <Text style = {[styles.text_medium, {marginVertical: 30, marginHorizontal: 10}]}> Current: {key} </Text>
                    {Popup(isModalVisible, toggleModal, handleOkPress, handleCancelPress)}
                </View>

            </View>
        </SafeAreaProvider>
    )
}

function KeyButtons(handleKeyPress) {
    return <View style={{ flex: .3, flexDirection: 'row' }}>
        <TouchableOpacity
            style={styles.keybox}
            onPress={() => handleKeyPress('Black')}
        >
            <Feather name="key" size={100} color="black" />
            <Text style={styles.key_title}> Black </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.keybox}
          onPress={() => handleKeyPress('Blue')}
        >
            <Feather name="key" size={100} color="dodgerblue" />
            <Text style={styles.key_title}> Blue </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.keybox}
          onPress={() => handleKeyPress('Green')}
        >
            <Feather name="key" size={100} color="aquamarine" />
            <Text style={styles.key_title}> Green </Text>
        </TouchableOpacity>
    </View>;
}

function Popup(isModalVisible, toggleModal, handleOkPress, handleCancelPress) {
    const snap = useSnapshot(store);
    const cur_keys = snap.cur_keys;
  
    KeepState()
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
              <Text style={{ color: 'white', fontSize: 22 }}> You are about to check out:</Text>
            </View>
  
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 22 }}> {cur_keys} </Text>
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


async function log_keys(snap){
  const res = await fetch(process.env.EXPO_PUBLIC_SHEETSURL, {
    method: "POST",
    
    body: JSON.stringify({
      'scriptfn': 'log_keys',
      'timestamp': moment().format('YYYY-MM-DD hh:mm:ss a'),
      'name': snap.username,
      'keyset': snap.cur_keys
    })
    
  })

  console.log(await res.text()) 
  
}