import {View, Text, TouchableOpacity, Modal} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "./styles"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';



export default function Hourly({navigation}){

    const [position, setPosition] = useState('N/A')
    const [isModalVisible, setModalVisible] = useState('false')
    const toggleModal = () => {setModalVisible(!isModalVisible)}
    const handleOkPress = () => {
        toggleModal();
      };
    
      const handleCancelPress = () => {
        toggleModal();
      };


    return (
        <SafeAreaProvider>
            
            <View style={[styles.header_bar, { alignItems: 'flex-start' }]}>
                <Text style={{ color: 'white', fontSize: 32, marginLeft: "3%" }}> Hourly Assignments </Text>
        </View>

        <View style = {{backgroundColor: '#25292e', flex: 1}}>
            <View style = {{flex: .1, justifyContent: 'center'}}> 
                <Text style ={{fontSize:25, color: 'white'}}> Select an hourly assignment</Text>
            </View>
            
            <View style = {{flex: .3, flexDirection: 'row'}}>
                <TouchableOpacity style = {{backgroundColor:'#333940', marginHorizontal:10, flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={{color:'white', fontSize: 22, marginVertical: 15}}> Property Rounds </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {{backgroundColor:'#333940', marginHorizontal:10, flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={{color:'white', fontSize: 25, margin: 15}}> Headcounts </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {{backgroundColor:'#333940', marginHorizontal:10, flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={{color:'white', fontSize: 25, margin: 15}}> Kiosk </Text>
                </TouchableOpacity>
                
            </View>
            
            <View style = {{flex: .4}}>
                <Text style = {{ color: 'white', fontSize: 25, marginVertical: 30, marginHorizontal: 10}}> Current Position: {position} </Text>

                <Modal
                    transparent={true}
                    visible={true}
                    onRequestClose={toggleModal}
                >
                    <View style = {{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    
                        <View style = {{backgroundColor: 'white', width: '25%', height: '25%', margin: '100'}}>

                        </View>
                    </View>
                </Modal>

            </View>
        </View>

        <TouchableOpacity
            style={{ backgroundColor: "#333940", flex: .09, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate('Menu')}
        >
        </TouchableOpacity>

        </SafeAreaProvider>
    )
}