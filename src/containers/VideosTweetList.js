import React,{Component} from 'react';
import {Image,Dimensions,ScrollView,TouchableOpacity,Button,View,Text,FlatList,StyleSheet,Platform,Animated,Easing} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TweetItem from '../components/TweetItem';
import LogOutHeader from './LogOutHeader';
import Amplify, { Auth } from 'aws-amplify';
import config from '../Utils/aws-exports';
import {logOut} from '../actions';
import {videosFilter,tweetDetail} from '../actions';
Amplify.configure(config)

const uri='http://echoes.staging.chinmayamission.com/wp-json/wp/v2/categories?slug=videos';

class VideosTweetList extends Component{

    // titleXPos=new Animated.Value(0);
    // animatedTitle=(direction=1)=>{
    // const width=Dimensions.get('window').width-230;
    // Animated.timing(
    //     this.titleXPos,
    //     {toValue: direction*(width/2),
    //       duration:700,
    //       easing:Easing.spring
    //     }).start(({finished})=> {
    //       if(finished){
    //         this.animatedTitle(-1*direction);
    //       }
    //     });
    // }

    loadingSpin=new Animated.Value(0);

    spinAnimation(){
      this.loadingSpin.setValue(0);
      Animated.sequence([
        Animated.timing(
          this.loadingSpin,
          {
            toValue:1,
            duration:1000,
          }
        )
      ]).start(()=>this.spinAnimation());
    }

    async componentDidMount() {
      const { VideosTweetsReducer: {
        tweetsAvailable
      }} = this.props;
      if(tweetsAvailable===false){
        const url=`${uri}`;
        fetch(url)
           .then(response => {
             response.json()
            .then(json => {
               json.map(category=>this.props.videosFilter(category.id))
             })
           })
           .catch();
      }
      this.spinAnimation();
    }

    goToDetail=(Id)=>{
      const { VideosTweetsReducer: {
        tweets,tweetsAvailable
      }} = this.props;
      const gotoScreen='Videos'

      const tweet=tweets.find((tweet) => tweet.id === Id);
      this.props.tweetDetail(tweet,gotoScreen);
      this.props.navigation.navigate('App');

    }

    onlogout=()=>{
      this.props.navigation.navigate('Auth');
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

    render() {
      const { VideosTweetsReducer: {
        tweets,tweetsAvailable
      }} = this.props;
      const spin=this.loadingSpin.interpolate({
          inputRange:[0,1],
          outputRange:['0deg','360deg']
      });
      if(tweetsAvailable===true)
      {
        return(
          <View style={styles.scrollContainer}>
              <FlatList
                data={tweets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <TweetItem onPress={()=>this.goToDetail(item.id)} tweet={item}/>}
                />
          </View>
        );
      }
      return (
        <View style={{backgroundColor:'grey',flex:1,alignItems: 'center',justifyContent: 'center',padding:20,}}>
          <Animated.Image resizeMode='stretch' style={{transform: [{rotate:spin}] ,backgroundColor:'white' ,borderColor:'black',borderWidth:1,borderRadius:10,height:100,width:100}} source={require('../Image/logo.png')} />
        </View>
      );
    }
}


const mapStateToProps=(state)=>{
  return{VideosTweetsReducer: state.VideosTweetsReducer}
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({logOut,videosFilter,tweetDetail},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosTweetList);

const styles=StyleSheet.create({
    scrollContainer:{
      backgroundColor:'#e6e6e6',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
    },
    button:{
        flexDirection:'row',
        justifyContent: 'center',
    },

});
