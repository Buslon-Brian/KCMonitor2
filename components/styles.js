import {StyleSheet} from 'react-native'
import { store } from '../stores/store';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
      },

    text_small: {
      color:'white',
      fontSize: 16,
    },

    text_medium: {
      color: 'white',
      fontSize: 22,
    },

    text_large: {
      color: 'white',
      fontSize: 32,
    },

    searchbox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:10,
        paddingHorizontal: 10,
        width: 390,
        maxWidth: '90%',
        textAlign: 'left',
      },

      input: {
        backgroundColor: '#fff',
        height: 40,
        marginTop: 40,
        borderWidth: 1,
        padding: 10,
      },
    
      item: {
        backgroundColor: '#333940',
        padding: 10,
        height: 200,
        width: 150,
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center'
      },
  
      image: {
        width:140,
        height: 140,
      },
    
      header_bar: {
        flex: .15,  
        alignItems: 'center', 
        justifyContent: 'center'
      },

      overlay: {
        ...StyleSheet.absoluteFillObject,
      },
  });

export default styles