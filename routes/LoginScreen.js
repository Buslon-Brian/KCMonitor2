import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity,} from 'react-native';
import { store } from '../stores/store';
import styles from '../components/styles';

function LoginScreen({ navigation }) {
  
  const [text, onChangeText] = React.useState('');
  
  return (
    <View style={styles.container}>
  
      <Text style = {{color: '#fff', fontSize: 25, marginBottom: 15}}>Welcome</Text>
      <Text style = {{color: '#fff', fontSize: 17, marginBottom: 11}}>Please enter your first and last name:</Text>
      
      <TextInput 
      style = {styles.searchbox} 
      placeholder= "Enter your name..." 
      placeholderTextColor = '#5c5c5c'
      onChangeText={onChangeText}
      value = {text}
      onSubmitEditing={()=> store.username = text}
      />
  
      <TouchableOpacity 
        style = {{backgroundColor: '#333940', margin: 15, paddingVertical:10, paddingHorizontal: 55, alignItems: 'center', marginTop: 35}} 
        onPress={() => navigation.navigate('Keys')}
      >
        <Text style = {{color: '#fff', fontSize: 16}}> Continue </Text>
      </TouchableOpacity>
    </View>
  );
}


export default LoginScreen