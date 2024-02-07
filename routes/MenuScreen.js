import {View, Text, FlatList, Image, TouchableOpacity, Linking} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import { Feather } from '@expo/vector-icons'

function MenuScreen({ navigation }) {
  const snap =useSnapshot(store)
  
  return (
      
  <SafeAreaProvider>

    {Header(snap)}
    {Grid(navigation)}
    {Footer(snap)}

  </SafeAreaProvider>
  );
}

const DATA = [
  {
    id: '1',
    path: 'users',
    title: 'Headcounts',
    screen: 'Headcounts',
  },
  {
    id: '2',
    path: 'camera',
    title: 'QR Codes',
    screen: 'QR',
  },
  {
    id: '3',
    path: 'list',
    title: 'Property Rounds',
    screen: 'Property',
  },
  {
    id: '4',
    path: 'clock',
    title: 'Hourly Assignments',
    screen: 'Hourly',
  },
  {
    id: '5',
    path: 'printer',
    title: 'Printers',
    screen: 'Printers',
  },
  {
    id: '6',
    path: 'key',
    title: 'Keys',
    screen: 'Keys',
  },
  {
    id: '7',
    path: 'tool',
    title: 'Maintenance Tickets',
  },
  {
    id: '8',
    path: 'settings',
    title: 'Settings',
    screen: 'Settings',
  },
  {
    id: '9',
    path: 'log-out',
    title: 'Log Out',
    screen: 'Login',
  },
];
 
const Item = ({ title, path, screen, navigation }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      if (title === 'Maintenance Tickets') {
        Linking.openURL('https://unr.teamdynamix.com/TDClient/Requests/ServiceDet?ID=27661').catch((err) =>
          console.error('Error opening URL:', err)
        );
      } else {
        // Navigate to screen if no URL
        navigation.navigate(screen);
      }
    }}
  >
    <Feather name= {path} size={100} color="white" style = {{flex: 1}}/>
    <Text style={{ color: '#fff', fontSize: 20 }} adjustsFontSizeToFit={true} allowFontScaling={true}>
      {title}
    </Text>
  </TouchableOpacity>
);

function Header(snap) {
  return <View style={[styles.header_bar, {backgroundColor: snap.color}]}>
    <Text style={{ color: '#fff', fontSize: 25 }}> KC Building Operations </Text>
  </View>;
}

function Grid(navigation) {
  return <View style={{ flex: 1, backgroundColor: '#25292e', alignItems: 'center', alignContent: 'center' }}>
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Item title={item.title} path={item.path} screen={item.screen} navigation={navigation} />}
      keyExtractor={item => item.id}
      numColumns={3} />
  </View>;
}

function Footer(snap) {
  return <View style={{ flex: .1, backgroundColor: '#25292e', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#fff', fontSize: 25, fontStyle: 'italic' }}>
      Good Morning, {snap.username}
    </Text>
  </View>;
}

export default MenuScreen