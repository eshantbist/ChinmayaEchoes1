import React, {Component} from 'react';
import {Image,TouchableHighlight,Text, View, StyleSheet,TouchableOpacity,Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component{

  render(){
    return(
      <View style={styles.heading}>
          <Image source={require('../Image/log.png')} style={styles.logo} />
          {/*<FontAwesome name={'home'} style={styles.homeIcon}/>
          <Text style={styles.headingText}>
            Chinmaya Echoes
          </Text>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    backgroundColor:'#e6e6e6',
    padding:10,
  },
  logo:{
    height:30,
    width:120,
  },
});
