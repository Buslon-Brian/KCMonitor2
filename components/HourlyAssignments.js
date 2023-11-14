import {View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "./styles"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
export default function Hourly({navigation}){
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
                <TouchableOpacity style = {{backgroundColor:'#333940', marginHorizontal:10, flex: 1}}/>
                <TouchableOpacity style = {{backgroundColor:'#333940', marginHorizontal:10, flex: 1}}/>
                <TouchableOpacity style = {{backgroundColor:'#333940', marginHorizontal:10, flex: 1}}/>
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