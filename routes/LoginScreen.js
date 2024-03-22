import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity,} from 'react-native';
import { store } from '../stores/store';
import styles from '../components/styles';
import SubmitBttnfn from '../components/SubmitBttn';

function LoginScreen({ navigation }) {
  
  const [text, onChangeText] = React.useState('');
  const [error, setError] = useState(false);
  
  if(error == false){
    return (
      <View style={styles.container}>
    
        <Text style = {[styles.text_medium, {marginBottom: 15}]}>Welcome</Text>
        <Text style = {[styles.text_small, {marginBottom: 11}]}>Please enter your first and last name:</Text>
        
        <TextInput 
        style = {styles.searchbox} 
        placeholder= "Enter your name..." 
        placeholderTextColor = '#5c5c5c'
        onChangeText={onChangeText}
        value = {text}
        onSubmitEditing={()=> validate(text, navigation, setError)}
        />
    
        <TouchableOpacity 
          style = {{backgroundColor: '#333940', margin: 15, paddingVertical:10, paddingHorizontal: 55, alignItems: 'center', marginTop: 35}} 
          onPress={() => validate(text, navigation, setError)} 
        >
        
        <Text style = {styles.text_small}> Continue </Text>
        </TouchableOpacity>
      </View>
    );
  }

  else {
    return (
      <View style={styles.container}>
    
        <Text style = {[styles.text_medium, {marginBottom: 15}]}>Welcome</Text>
        <Text style = {[styles.text_small, {marginBottom: 11}]}>Please enter your first and last name:</Text>
        
        <TextInput 
        style = {styles.searchbox} 
        placeholder= "Enter your name..." 
        placeholderTextColor = '#5c5c5c'
        onChangeText={onChangeText}
        value = {text}
        onSubmitEditing={()=> validate(text, navigation, setError)}
        />
        
        <Text style = {[styles.text_small, {color: 'red'}]}> Error: Invalid firstname or lastname</Text>
        
        <TouchableOpacity 
          style = {{backgroundColor: '#333940', margin: 15, paddingVertical:10, paddingHorizontal: 55, alignItems: 'center', marginTop: 35}} 
          onPress={() => validate(text, navigation, setError)} 
        >
          <Text style = {styles.text_small}> Continue </Text>
        </TouchableOpacity>
      </View>
    )
  }
  
}

async function validate(input, navigation, setError){
  store.username = input
  let firstname = input.split(" ")[0]
  let lastname = input.split(" ")[1]

  const res = await fetch(process.env.EXPO_PUBLIC_SHEETSURL, {
    method: "POST",
    
    body: JSON.stringify({
      'scriptfn': 'verify_user',
      'firstname': firstname,
      'lastname': lastname,
    })
    
  })
  
  const output = await res.text()
  if(output == "true"){
    setError(false)  
    navigation.navigate('Keys')
  }

  else{setError(true)}
}

export default LoginScreen