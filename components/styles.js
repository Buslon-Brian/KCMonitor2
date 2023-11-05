import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginVertical: 5,
        marginHorizontal: 5,
        maxWidth: 160,
        alignItems: 'center'
      },
  
      image: {
        width:140,
        height: 140,
      },
    
      header_bar: {
        flex: .15, 
        backgroundColor: '#041e42', 
        alignItems: 'center', 
        justifyContent: 'center'
      },

      unr_blue:{
        color: '#041e42'
      },

      b_gray:{
        color: '#25292e'
      },

      bttn_color:{
        backgroundColorcolor: '#333940'
      },
  });

export default styles