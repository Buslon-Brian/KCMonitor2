import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "../components/styles"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import { Feather } from '@expo/vector-icons';
import Header_c from '../components/Header';
import SubmitBttnfn from '../components/SubmitBttn';

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
        navigation.navigate('Menu')
    }

    const handleCancelPress = () => {toggleModal()}
    return (
        <SafeAreaProvider>
            <Header_c title = "Keys" navigation = {navigation}/>
            
            <View style = {{backgroundColor: '#25292e', flex: 1}}>
                <View style = {{flex: .1, justifyContent: 'center'}}> 
                    <Text style ={{fontSize:25, color: 'white'}}> Select a Key Set</Text>
                </View>
                
                {KeyButtons(handleKeyPress)}

                <View style = {{flex: .4}}>
                    <Text style = {{ color: 'white', fontSize: 25, marginVertical: 30, marginHorizontal: 10}}> Current: {key} </Text>
                    {Popup(isModalVisible, toggleModal, handleOkPress, handleCancelPress)}
                </View>

            </View>
        </SafeAreaProvider>
    )
}

function KeyButtons(handleKeyPress) {
    return <View style={{ flex: .3, flexDirection: 'row' }}>
        <TouchableOpacity
            style={{ backgroundColor: '#333940', marginHorizontal: 10, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            onPress={() => handleKeyPress('Black')}
        >
            <Feather name="key" size={100} color="black" />
            <Text style={{ color: 'white', fontSize: 22, marginVertical: 15 }}> Black </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: '#333940', marginHorizontal: 10, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            onPress={() => handleKeyPress('Blue')}
        >
            <Feather name="key" size={100} color="dodgerblue" />
            <Text style={{ color: 'white', fontSize: 25, margin: 15 }}> Blue </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: '#333940', marginHorizontal: 10, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            onPress={() => handleKeyPress('Green')}
        >
            <Feather name="key" size={100} color="aquamarine" />
            <Text style={{ color: 'white', fontSize: 25, margin: 15 }}> Green </Text>
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

function KeepState() {
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(store);
          await AsyncStorage.setItem('state', jsonValue);
        } catch (e) {
          // saving error
        }
      };

      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('state');
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
      };
}
 