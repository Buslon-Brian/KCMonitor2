import { useState } from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import Header_c from '../components/Header';

export default function Settings({ navigation }){
    const [isModalVisible, setModalVisible] = useState(true)
    const toggleModal = () => {setModalVisible(!isModalVisible)}   
   
    const handleOkPress = () => {
        toggleModal()
    }


    return (
        <SafeAreaProvider>
            <Header_c title = "Settings" navigation = {navigation}/>
            <View style = {[styles.container, {flexDirection: 'row', alignItems: 'flex-start'}]}>
            
            <TouchableOpacity
                style={{ flex: 1, color: 'white', backgroundColor: '#333940', marginHorizontal: '15%', padding: 10, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => toggleModal()}
            >
                <Text style = {{color: 'white'}}> App Information </Text>
            </TouchableOpacity>
            
            {Popup(isModalVisible, toggleModal, handleOkPress)}


            </View>
        </SafeAreaProvider>
    )

}

function Popup(isModalVisible, toggleModal, handleOkPress) {
    const snap = useSnapshot(store);
    const cur_keys = snap.cur_keys;
  
    return (
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  
          <View style={{ ...styles.overlay, backgroundColor: isModalVisible ? 'rgba(0, 0, 0, 0.7)' : 'transparent' }} />
  
          <View style={{ backgroundColor: '#25292e', width: '66%', height: '25%', margin: '100', flexDirection: 'column' }}>
        
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text 
                style={{ color: 'white', fontSize: 22, textAlign: 'center', margin: '5%' }}
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                > 
                
                Building Operations App Built by Ryan Long, Redesigned by Brian Buslon for
                The MIKC Building Ops Department.
                Version: 2.0
                </Text>
            </View>
  
           
            <View style={{ flex: .25, flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ flex: 1, color: 'white', backgroundColor: '#041e42', margin: 5, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => handleOkPress()}
              >
                <Text style = {{color: 'white'}}> OK </Text>
              </TouchableOpacity>
  
            </View>
          
          </View>

        </View>

      </Modal>
    );
}
