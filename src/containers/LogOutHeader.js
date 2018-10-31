import React, {Component} from 'react';
import {Alert,TextInput,Image,Dimensions,TouchableHighlight,Text, View, StyleSheet,TouchableOpacity,Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Amplify, { Auth } from 'aws-amplify';
import config from '../Utils/aws-exports';
import {logOut,searchAll,searchVideos,searchQuotes} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import debounce from 'lodash.debounce';

const width=Dimensions.get('window').width;
class LogOutHeader extends Component{

  constructor(props){
      super(props);
      this.state={
          searchTerm:'',
          iconClick:false,
          empty:'',
      }
  }

  logout=()=> {
    Auth.signOut()
      .then(() => {
        this.props.logOut()
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }

  debounceSearchAllTweets=debounce(this.props.searchAll,200);

  getActiveRouteName =(routes)=>{
    let last=this.props.navigation.state.routes[0].routes.length - 1;
    let curentScreen =this.props.navigation.state.routes[0].routes[last].routeName;
    Alert.alert(curentScreen);
  }

  handleChange=(searchTerm)=>{
    this.setState({searchTerm},()=>{
      this.debounceSearchAllTweets(this.state.searchTerm,this.state.filter);
    });
  }

  checkIconClick=()=>{
    if(this.state.iconClick===true){
      this.props.searchAll('');
    }
    this.setState({searchTerm:''})
    this.setState({iconClick:!this.state.iconClick});
  }

  render(){
    if(this.state.iconClick){
      return(
        <View style={{flexDirection:'row',padding:10,backgroundColor:'#e6e6e6',}}>
              <TouchableOpacity onPress={()=>this.checkIconClick()}>
                <FontAwesome name={'arrow-left'} style={styles.arrowIcon}/>
              </TouchableOpacity>
              <View style={{marginVertical:2,flexDirection:'row'}}>
                <FontAwesome name={'search'} style={styles.otherSearchIcon}/>
                <View style={styles.inputView}>
                  <TextInput
                      placeholder='Search...'
                      value = {this.state.searchTerm}
                      multiline={false}
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      onChangeText={this.handleChange}
                  />
                </View>
              </View>
        </View>
      );
    }
    return(
      <View style={styles.headerContainer}>
            <Image source={require('../Image/logo.png')} style={styles.logo} />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <TouchableOpacity onPress={()=>this.logout()} style={styles.goBack}>
                <Text style={styles.logout}>
                  <FontAwesome name={'sign-out'}/>
                   Log Out
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.checkIconClick()}>
                <FontAwesome name={'search'} style={styles.searchIcon}/>
              </TouchableOpacity>
            </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  SignInReducer: state.SignInReducer
})

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({logOut,searchAll,searchVideos,searchQuotes},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LogOutHeader);

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:5,
    backgroundColor:'#e6e6e6',
  },
  logo:{
    height:30,
    width:100,
  },
  logout:{
    marginVertical:5,
    marginRight:10,
  },
  container:{
    flexDirection:'row',
  },
  rightContainer:{
    flexDirection:'row',
    backgroundColor:'white',
    width:100,
    borderRadius:8,
    marginLeft:10,
    borderWidth:1,
    borderColor:"#bbb",
  },
  searchIcon:{
    marginHorizontal:5,
    fontSize:25,
    color:'black'
  },
  input:{
    fontFamily:"Times New Roman",
    fontSize:16,
    textAlign:'left',
    padding:0,
    marginTop:Platform.OS === 'ios' ?0 : -5,
  },
  inputView:{
    marginLeft:10,

  },
  arrowIcon:{
    fontSize:20,
    marginRight:30,
    marginLeft:10,
  },
  otherSearchIcon:{
    marginHorizontal:5,
    fontSize:15,
    color:'black'
  }
  // heading:{
  //   flexDirection:'row',
  // },
  // headingText:{
  //   fontSize:18,
  //   fontWeight:'800',
  //   color:'black',
  //   fontFamily:Platform.OS === 'ios' ? 'cochin' : 'monospace',
  // },
  // homeIcon:{
  //   fontSize:22,
  //   color:'black',
  // },

});
