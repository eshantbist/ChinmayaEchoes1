import React, {Component} from 'react';
import {Dimensions,TouchableHighlight,Text, View, StyleSheet,TouchableOpacity,Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Amplify, { Auth } from 'aws-amplify';
import config from '../Utils/aws-exports';
import {logOut} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const width=Dimensions.get('window').width;
class LogOutHeader extends Component{

  logout=()=> {
    Auth.signOut()
      .then(() => {
        this.props.logOut()
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }

  render(){
    return(
      <View style={styles.headerContainer}>
          <View style={styles.heading}>
            <FontAwesome name={'home'} style={styles.homeIcon}/>
            <Text style={styles.headingText}>
              Chinmaya Echoes
            </Text>
          </View>
          <TouchableOpacity onPress={()=>this.logout()} style={styles.goBack}>
                <Text style={styles.logOut}>
                  <FontAwesome name={'sign-out'}/>
                   Log Out
                </Text>
          </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  SignInReducer: state.SignInReducer
})

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({logOut},dispatch);
}
// const mapStateToProps=(state)=>{
//   return{allTweets:state.TweetsReducer ,searchTweets:state.SearchReducer}
// }

export default connect(mapStateToProps,mapDispatchToProps)(LogOutHeader);

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:12,
    backgroundColor:'#e6e6e6',
  },
  heading:{
    flexDirection:'row',
  },
  headingText:{
    fontSize:18,
    fontWeight:'800',
    color:'black',
    fontFamily:Platform.OS === 'ios' ? 'cochin' : 'monospace',
    marginLeft:10,
  },
  homeIcon:{
    fontSize:22,
    color:'black',
  },
  logOut:{
    marginVertical:2,
  }
});
