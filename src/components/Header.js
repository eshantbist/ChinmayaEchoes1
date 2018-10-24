import React, {Component} from 'react';
import {TouchableHighlight,Text, View, StyleSheet,TouchableOpacity,Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component{

  render(){
    return(
      <View style={styles.heading}>
          <FontAwesome name={'home'} style={styles.homeIcon}/>
          <Text style={styles.headingText}>
            Chinmaya Echoes
          </Text>
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
  homeIcon:{
    fontSize:25,
    color:'black',
    marginRight:10,
  },
  headingText:{
    fontSize:20,
    fontWeight:'800',
    color:'black',
    fontFamily:Platform.OS === 'ios' ? 'cochin' : 'monospace'
  }
});
