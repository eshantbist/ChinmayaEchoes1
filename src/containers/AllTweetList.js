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
import {fetchtweets,tweetDetail} from '../actions';
Amplify.configure(config)


class AllTweetList extends Component{

    titleXPos=new Animated.Value(0);
    animatedTitle=(direction=1)=>{
    const width=Dimensions.get('window').width-230;
    Animated.timing(
        this.titleXPos,
        {toValue: direction*(width/2),
          duration:700,
          easing:Easing.spring
        }).start(({finished})=> {
          if(finished){
            this.animatedTitle(-1*direction);
          }
        });
    }

    async componentDidMount() {
      this.props.fetchtweets();
      this.animatedTitle();
    }

    goToDetail=(Id)=>{
      const { AllTweetsReducer: {
        tweets
      }} = this.props;

      const tweet=tweets.find((tweet) => tweet.id === Id);
      this.props.tweetDetail(tweet);
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
      const { AllTweetsReducer: {
        tweets
      }} = this.props;
      if(tweets!==null)
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
        <Animated.View style={[{left:this.titleXPos}, styles.container]}>
            <Text style={styles.header}>Chinmaya Echoes</Text>
        </Animated.View>
      );
    }
}


const mapStateToProps=(state)=>{
  return{AllTweetsReducer: state.AllTweetsReducer}
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({logOut,fetchtweets,tweetDetail},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTweetList);

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
