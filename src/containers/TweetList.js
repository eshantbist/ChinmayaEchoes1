import React,{Component} from 'react';
import {Image,Dimensions,ScrollView,TouchableOpacity,Button,View,Text,FlatList,StyleSheet,Platform,Animated,Easing} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchBar from './SearchBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TweetItem from '../components/TweetItem';
import LogOutHeader from './LogOutHeader';
import Amplify, { Auth } from 'aws-amplify';
import config from '../Utils/aws-exports';
import {logOut} from '../actions';
import {fetchtweets} from '../actions';
Amplify.configure(config)


class TweetList extends Component{

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
      const { TweetsReducer: {
        tweets
      }} = this.props;

      const tweet=tweets.find((tweet) => tweet.id === Id);
      this.props.navigation.navigate('TweetDetail',{tweet:tweet});

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
      const { TweetsReducer: {
        tweets
      }} = this.props;
      if(tweets!==null)
      {
        return(
          <View style={styles.mainContainer}>
            <LogOutHeader/>
            <View style={styles.search}>
              <SearchBar/>
            </View>
            <View style={styles.scrollContainer}>
              <FlatList
                data={tweets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <TweetItem onPress={()=>this.goToDetail(item.id)} tweet={item}/>}
                />
            </View>
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
  return{TweetsReducer: state.TweetsReducer}
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({logOut,fetchtweets},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);

const styles=StyleSheet.create({
    mainContainer:{
      backgroundColor:'#e6e6e6',
      marginTop:Platform.OS === 'ios' ?20:0,
      marginBottom:Platform.OS === 'ios' ?30:35,
    },
    scrollContainer:{
      marginBottom:150,
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
    search:{
      marginBottom:10,
    },

});
