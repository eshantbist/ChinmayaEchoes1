import React, {Component} from 'react';
import {SafeAreaView,Animated,Alert,Dimensions,ScrollView,Modal,TouchableOpacity,Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {authenticate,onForgotPasswordClick} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../components/Header';


const width=Dimensions.get('window').width;
const IconWidth=width/2.8;
const height=Dimensions.get('window').height;
const newHeight=height/4;

class SignIn extends Component {
  state = {
    username:'',
    password:'',
    user:{},
  }

  loadingSpin=new Animated.Value(0);

  spinAnimation(){
    this.loadingSpin.setValue(0);
    Animated.sequence([
      Animated.timing(
        this.loadingSpin,
        {
          toValue:1,
          duration:380,
        }
      )
    ]).start(()=>this.spinAnimation());
  }

  componentDidMount(){
    this.spinAnimation();
  }
  onChangeText(key,value) {
    this.setState({ [key]:value })
  }

  signIn=()=> {
    const { username, password } = this.state
    if(username===''||password==='')
    {
      Alert.alert('Fill all fields')
    }
    lowerCaseUsername=username.toLowerCase();
    this.props.authenticate(lowerCaseUsername, password)
  }

  forgotPassword=()=>{
      this.props.onForgotPasswordClick()
  }

  closemodal=()=>{
    console.log('modal closed');
  }
  render() {
    const spin=this.loadingSpin.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','360deg']
    });
    const { SignInReducer: {
      signInErrorMessage,
      isAuthenticating,
      signInError,
      showLoadingModel,
    }} = this.props
    const { username, password } = this.state
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView>
          <View>
            <FontAwesome name={'user-circle'} color={'#333333'} size={100} style={styles.userIcon}/>
              {signInErrorMessage!==''&&<Text style={{marginHorizontal:30,color:'black'}}>Invalid Username or Password</Text>}
              <TextInput
                placeholder='Username'
                onChangeText={value => this.onChangeText('username',value)}
                style={styles.input}
              />
              <TextInput
                placeholder='Password'
                onChangeText={value => this.onChangeText('password',value)}
                secureTextEntry={ true }
                style={styles.input}
              />
              <TouchableOpacity isLoading={isAuthenticating} onPress={()=>this.signIn()} style={styles.button} >
                <Text style={{fontWeight:'900',fontSize:16,color:'white'}}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.forgotPassword()} style={styles.button} >
                <Text style={{fontWeight:'900',fontSize:16,color:'white'}}>Forgot Password??</Text>
              </TouchableOpacity>
            </View>
            {
              showLoadingModel && (
                <Modal onRequestClose={()=>this.closemodal()}  transparent={true} >
                  <SafeAreaView style={styles.modal}>
                  <Animated.Image style={{transform: [{rotate:spin}],height:80,width:80}} source={require('../Image/circle.png')} />
                  </SafeAreaView>
                </Modal>
              )
            }
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({authenticate,onForgotPasswordClick},dispatch);
}

const mapStateToProps=(state)=>{
  return{SignInReducer:state.SignInReducer};
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);

const styles = StyleSheet.create(
  {
    container: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

    },
    input: {
      height: 50,
      backgroundColor: '#ededed',
      marginVertical:10,
      paddingLeft:10,
      borderRadius:10,
      borderColor:'#d9d9d9',
      borderWidth:1,
      marginHorizontal:30,
    },
    userIcon:{
      marginHorizontal:IconWidth,
      marginTop:Platform.OS === 'ios' ?80:60,
      marginBottom:20,
    },
    button:{
      padding:7,
      alignItems:'center',
      backgroundColor:'#1a8cff',
      borderRadius:6,
      marginHorizontal:100,
      marginVertical:10,
    },
    modal:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:120,
      marginVertical:350,
    }
  },
);
