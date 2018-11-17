import React, {Component} from 'react';
import {Alert,Dimensions,ScrollView,Modal,TouchableOpacity, Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createUser} from '../actions';
import {confirmUserSignUp,closeSignUpModal} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../components/Header'

const width=Dimensions.get('window').width;
const newWidth=width/2.4;
const height=Dimensions.get('window').height;
const newHeight=height/4;

const initialState = {
  username: '',
  password: '',
  email: '',
  phone_number: '',
  authCode: '',
  filterDisplay:false,
}
class SignUp extends Component {
  state = initialState
  onChangeText(key,value) {
    this.setState({ [key]:value })
  }

  signUp=()=> {
    const { username, password, email, phone_number } = this.state;
    if(username===''||password===''||email===''||phone_number==='')
    {
      Alert.alert('Fill all fields')
    }
    lowerCaseUsername=username.toLowerCase();
    this.props.createUser(lowerCaseUsername,password,email,phone_number)
  }

  confirm=()=> {
    const { authCode, username } = this.state;
    lowerCaseUsername=username.toLowerCase();
    this.props.confirmUserSignUp(lowerCaseUsername, authCode);
    this.props.navigation.navigate('SignIn')
  }

  componentWillReceiveProps(nextProps) {
    const { SignUpReducer: { showSignUpConfirmationModal,showOldUserConfirmationModal }} = nextProps
    if (!showSignUpConfirmationModal && this.props.SignUpReducer.showSignUpConfirmationModal) {
      this.setState(initialState)
    }
  }


  onPasswordPress=()=>{
    Alert.alert(
      '',
      'Minimum length of password should be 8.It should contain at atleast one Uppercase and one LowerCase.It should also contain atleast one special character and one number',
    )
  }

  onUsernamePress=()=>{
    Alert.alert(
      '',
      'There should be no space in Username',
    )
  }

  render() {
    const { SignUpReducer: {
      showSignUpConfirmationModal,
      isAuthenticating,
      signUpError,
      signUpErrorMessage,
      showOldUserConfirmationModal
    }} = this.props
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView>
          <FontAwesome name={'user-plus'} color={'#333333'} size={50} style={styles.userIcon}/>
            {signUpErrorMessage!==''&&<Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text>}
            <View style={styles.passwordInput}>
              <TextInput
                placeholder='Username'
                onChangeText={value => this.onChangeText('username',value)}
                value={this.state.username}
                style={styles.input}
              />
              <TouchableOpacity style={styles.starIcon} onPress={this.onUsernamePress}>
                <FontAwesome name={'bullseye'} size={20} color={'#E57373'}/>
              </TouchableOpacity>
            </View>
            <View style={styles.passwordInput}>
              <TextInput
                placeholder='Password'
                onChangeText={value => this.onChangeText('password',value)}
                value={this.state.password}
                style={styles.input}
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.starIcon} onPress={this.onPasswordPress}>
                <FontAwesome name={'bullseye'} size={20} color={'#E57373'}/>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder='Phone'
              onChangeText={value => this.onChangeText('phone_number',value)}
              value={this.state.phone_number}
              keyboardType='numeric'
              style={styles.input}
            />
            <TextInput
              placeholder='Email'
              onChangeText={value => this.onChangeText('email',value)}
              value={this.state.email}
              style={styles.input}
            />
            <TouchableOpacity onPress={()=>this.signUp()} isLoading={isAuthenticating} style={styles.button} >
              <Text style={{fontWeight:'900',fontSize:16,color:'white'}}>Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
        {
          showSignUpConfirmationModal && (
            <Modal onRequestClose={this.props.closeSignUpModal}>
              <View style={styles.modal}>
                <TextInput
                  placeholder="Authorization Code"
                  onChangeText={value => this.onChangeText('authCode',value)}
                  value={this.state.authCode}
                  keyboardType='numeric'
                  style={styles.modalInput}
                />
                <View style={{marginBottom:10}}>
                  <Button
                    title='Confirm'
                    onPress={()=>this.confirm()}
                    isLoading={isAuthenticating}
                  />
                </View>
                <View>
                  <Button
                    title='Cancel'
                    onPress={this.props.closeSignUpModal}
                  />
                </View>
              </View>
            </Modal>
          )
        }
        {
          showOldUserConfirmationModal && (
            <Modal onRequestClose={this.props.closeSignUpModal}>
              <View style={styles.modal}>
                <Text>You have already a account just verify your Otp</Text>
                <TextInput
                  placeholder="Authorization Code"
                  onChangeText={value => this.onChangeText('authCode',value)}
                  value={this.state.authCode}
                  keyboardType='numeric'
                  style={styles.modalInput}
                />
                <View style={{marginBottom:10}}>
                  <Button
                    title='Confirm'
                    onPress={()=>this.confirm()}
                    isLoading={isAuthenticating}
                  />
                </View>
                <View>
                  <Button
                    title='Cancel'
                    onPress={this.props.closeSignUpModal}
                  />
                </View>
              </View>
            </Modal>
          )
        }
      </View>
    );
  }
}
const mapStateToProps=(state)=>{
  return{SignUpReducer:state.SignUpReducer};
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({confirmUserSignUp,createUser,closeSignUpModal},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalInput:{
    borderWidth:1,
    borderColor:'#d9d9d9',
    borderRadius:10,
    marginVertical:20,
    padding:Platform.OS === 'ios' ?10:5,
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
    marginHorizontal:newWidth,
    marginBottom:20,
    marginTop:Platform.OS === 'ios' ?80:45,
  },
  starIcon:{
    position:'absolute',
    right:20,
    padding:20,
    top:5,
  },
  button:{
    padding:10,
    alignItems:'center',
    backgroundColor:'#1a8cff',
    borderRadius:6,
    marginHorizontal:100,
    marginVertical:10,
  }
});
