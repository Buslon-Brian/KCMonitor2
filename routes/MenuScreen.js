import {View, Text, FlatList, Image, TouchableOpacity, Linking} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import peopleImage from '../assets/images/people.png';
import qrCodeImage from '../assets/images/QRCode.png';
import buildingImage from '../assets/images/Building.png';
import clockImage from '../assets/images/Clock.png';
import printerImage from '../assets/images/Printer.png';
import keyImage from '../assets/images/Key.png';
import ticketsImage from '../assets/images/Tickets.png';
import logoutImage from '../assets/images/LogOut.png';

function MenuScreen({ navigation }) {
  const snap =useSnapshot(store)
  
  return (
      
  <SafeAreaProvider>

    {Header()}
    {Grid(navigation)}
    {Footer(snap)}

  </SafeAreaProvider>
  );
}

const DATA = [
  {
    id: '1',
    path: peopleImage,
    title: 'Headcounts',
    screen: 'Headcounts',
  },
  {
    id: '2',
    path: qrCodeImage,
    title: 'QR Codes',
    screen: 'QR',
  },
  {
    id: '3',
    path: buildingImage,
    title: 'Property Rounds',
    screen: 'Property',
  },
  {
    id: '4',
    path: clockImage,
    title: 'Hourly Assignments',
    screen: 'Hourly',
  },
  {
    id: '5',
    path: printerImage,
    title: 'Printers',
    screen: 'Printers',
  },
  {
    id: '6',
    path: keyImage,
    title: 'Keys',
    screen: 'Keys',
  },
  {
    id: '7',
    path: ticketsImage,
    title: 'Maintenance Tickets',
  },
  {
    id: '9',
    path: logoutImage,
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
    <Image style={styles.image} source={path} onError={(error) => console.log('Image loading error:', error)} />
    <Text style={{ color: '#fff', fontSize: 20 }} adjustsFontSizeToFit={true} allowFontScaling={true}>
      {title}
    </Text>
  </TouchableOpacity>
);

function Header() {
  return <View style={styles.header_bar}>
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