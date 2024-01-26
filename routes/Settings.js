import { useState } from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import Header_c from '../components/Header';
import { SketchPicker } from 'react-color'

export default function Settings({ navigation }){
    const [isModalVisible, setModalVisible] = useState(true)
    const toggleModal = () => {setModalVisible(!isModalVisible)}   
    const handleOkPress = () => {toggleModal()}
    const [currentColor, setCurrentColor] = useState('#041e42');
    const handleChangeComplete = (color) => {
      setCurrentColor(color)
      store.color = color.hex
    }
  
    return (
        <SafeAreaProvider>
            <Header_c title = "Settings" navigation = {navigation}/>
            
            <View style = {{flex: 1, flexDirection: 'row', backgroundColor: '#25292e'}}>
           
              <View style = {{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <SketchPicker 
                color={currentColor}
                onChangeComplete={handleChangeComplete}
                presetColors={['#041e42', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']}
                />
              </View>


              <View style = {{flex: 1, flexDirection: 'column'}}>
                <Text style = {{color: 'white', margin: 10}}> Current Color: {currentColor.hex}</Text>
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
