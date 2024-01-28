import { useState } from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import Header_c from '../components/Header';
import ColorPicker from 'react-native-wheel-color-picker';

export default function Settings({ navigation }){
    const snap = useSnapshot(store)
    const [isModalVisible, setModalVisible] = useState(false)
    const toggleModal = () => {setModalVisible(!isModalVisible)}   
    const handleOkPress = () => {toggleModal()}
    const [color, setColor] = useState(snap.color);
    const onColorChange = color => {
    setColor(color);
    store.color = color
    };
  
    return (
        <SafeAreaProvider>
            <Header_c title = "Settings" navigation = {navigation}/>
            
            <View style = {{flex: 1, flexDirection: 'row', backgroundColor: '#25292e'}}>
           
              <View style = {{flex: 1, justifyContent: 'flex-start', marginBottom: 15}}>
                <ColorPicker
                color={color}
                onColorChange={(color) => onColorChange(color)}
                palette={['#000000','#888888','#ed1c24','#041e42','#1633e6','#00aeef','#00c85d','#57ff0a','#ffde17','#f26522']}
                thumbSize={30}
                sliderSize={30}
                noSnap={true}
                row={false}
                />
              </View>


              <View style = {{flex: 1, flexDirection: 'column'}}>
                <Text style = {{color: 'white', margin: 10}}> Current Color: {color}</Text>
                <TouchableOpacity
                  style={{color: 'white', backgroundColor: '#333940', padding: 10, justifyContent: 'center', alignItems: 'center', margin: 10 }}
                  onPress={() => toggleModal()}
                >
                  <Text style = {{color: 'white'}}> App Information </Text>
                </TouchableOpacity>
              </View>
            
              {Popup(isModalVisible, toggleModal, handleOkPress)}
            </View>
        </SafeAreaProvider>
    )

}

function Popup(isModalVisible, toggleModal, handleOkPress) {

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
