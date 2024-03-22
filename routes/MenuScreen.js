import {View, Text, FlatList, Image, TouchableOpacity, Linking} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import menudata from '../components/menudata';

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


const DATA = menudata
 
const Item = ({ title, path, screen, navigation }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      if (title === 'Maintenance Tickets') {
        Linking.openURL('https://unr.teamdynamix.com/TDClient/Requests/ServiceDet?ID=27661').catch((err) =>
          console.error('Error opening URL:', err)
        );
      } 
      
      else {
        navigation.navigate(screen);
      }
    }}
  >
    <Feather name= {path} size={120} color="white" style = {{flex: 1}}/>
    
    <Text style={styles.text_medium} adjustsFontSizeToFit={true} allowFontScaling={true}>
      {title}
    </Text>
  </TouchableOpacity>
);

function Header(snap) {
  return <View style={[styles.header_bar, {backgroundColor: snap.color}]}>
    <Text style={styles.text_medium}> KC Building Operations </Text>
  </View>;
}

function Grid(navigation) {
  return <View style={{ flex: 1, backgroundColor: '#25292e', alignItems: 'center', alignContent: 'center' }}>
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Item title={item.title} path={item.path} screen={item.screen} navigation={navigation} />}
      keyExtractor={item => item.id}
      numColumns={3} 
    />
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