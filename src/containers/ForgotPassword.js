import React, {Component} from 'react';
import {BackHandler,ScrollView,Modal,TouchableOpacity,Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../components/Header';
import {userForgotPassword,onForgotPasswordClick,confirmForgotPassword,cancelForgotPassword} from '../actions';

class ForgotPassword extends Component {
  state = {
    username:'',
    new_password:'',
    authCode:'',
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.cancelForgotPassword();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onChangeText(key,value) {
    this.setState({[key]:value})
  }

  confirm=()=>{
    const { username,authCode,new_password } = this.state
    this.props.confirmForgotPassword(username,authCode,new_password);
  }

  showVerify=()=>{
    this.props.userForgotPassword(this.state.username)
  }

  onBack=()=>{
    this.props.cancelForgotPassword();
  }

  render() {
    const { ForgotPasswordReducer: {
      showForgotPasswordModal,
    }} = this.props
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView>
          <TouchableOpacity onPress={()=>this.onBack()} style={styles.goBack}>
            <Text style={styles.backLink}>
              <FontAwesome name={'chevron-left'} style={styles.chevron}/>
              Back
            </Text>
          </TouchableOpacity>
          <FontAwesome name={'user-circle'} color={'#333333'} size={100} style={styles.userIcon}/>
          <View style={{marginHorizontal:20}}>
          <TextInput
            placeholder='Username'
            onChangeText={value => this.onChangeText('username',value)}
            style={styles.input}
          />
          <TouchableOpacity onPress={()=>this.showVerify()} style={{marginVertical:10,padding:10,alignItems:'center',backgroundColor:'#1a8cff',borderRadius:5}} >
            <Text style={{fontWeight:'900',fontSize:16,color:'white'}}>Next</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
        {
          showForgotPasswordModal && (
            <Modal onRequestClose={this.props.onForgotPasswordClick}>
              <View style={styles.modal}>
                <TextInput
                  placeholder="Authorization Code"
                  onChangeText={value => this.onChangeText('authCode',value)}
                  value={this.state.authCode}
                  keyboardType='numeric'
                  style={styles.modalInput}
                />
                <TextInput
                  placeholder="New Password"
                  keyboardType='numeric'
                  onChangeText={value => this.onChangeText('new_password',value)}
                  value={this.state.new_password}
                  style={styles.modalInput}
                />

                  <View style={{marginBottom:10}}>
                    <Button
                      title='Confirm'
                      onPress={()=>this.confirm()}
                    />
                  </View>
                  <View>
                    <Button
                      title='Cancel'
                      onPress={this.props.onForgotPasswordClick}
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

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({userForgotPassword,onForgotPasswordClick,confirmForgotPassword,cancelForgotPassword},dispatch);
}

const mapStateToProps=(state)=>{
  return{ForgotPasswordReducer:state.ForgotPasswordReducer};
}
export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Platform.OS === 'ios' ?20:0,
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
    marginBottom:20,
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
  },
  userIcon:{
    marginHorizontal:130,
    marginBottom:20,
    marginTop:Platform.OS === 'ios' ?80:45,
  },
  backLink:{
  marginBottom:5,
  color:'white',
  fontSize:18,
  },
  goBack:{
    padding:7,
    alignItems:'center',
    backgroundColor:'#999999',
    marginBottom:10,
    alignItems:'flex-start',
  },
  chevron:{
    fontSize:16
  },
});
