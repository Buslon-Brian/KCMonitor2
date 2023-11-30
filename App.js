import * as React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './components/LoginScreen'
import MenuScreen from './components/MenuScreen'
import Headcounts from './components/Headcounts'
import Property from './components/Property'
import QR from './components/QR'
import Printers from './components/Printers'
import Hourly from './components/HourlyAssignments'
import Keys from './components/Keys'

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
  <NavigationContainer>
    <Stack.Navigator 
    initialRouteName="Login" 
    screenOptions={{headerShown: false, animation: 'none',}}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Headcounts" component={Headcounts}/>
      <Stack.Screen name = "QR" component={QR}/>
      <Stack.Screen name = "Property" component={Property}/>
      <Stack.Screen name ="Printers" component = {Printers}/>
      <Stack.Screen name ="Hourly" component = {Hourly}/>
      <Stack.Screen name ="Keys" component = {Keys}/>
    
    </Stack.Navigator>
  </NavigationContainer>
  );
}


