import * as React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './routes/LoginScreen'
import MenuScreen from './routes/MenuScreen'
import Headcounts from './routes/Headcounts'
import Property from './routes/Property'
import QR from './routes/QR'
import Printers from './routes/Printers'
import Hourly from './routes/HourlyAssignments'
import Keys from './routes/Keys'
import Settings from './routes/Settings'

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
      <Stack.Screen name ="Settings" component = {Settings}/>
    
    </Stack.Navigator>
  </NavigationContainer>
  );
}


