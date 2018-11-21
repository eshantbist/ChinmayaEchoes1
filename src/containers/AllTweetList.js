import React,{Component} from 'react';
import {Modal,SafeAreaView,Alert,AsyncStorage,Image,Dimensions,ScrollView,TouchableOpacity,Button,View,Text,FlatList,StyleSheet,Platform,Animated,Easing} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TweetItem from '../components/TweetItem';
import LogOutHeader from './LogOutHeader';
import Amplify, { Auth } from 'aws-amplify';
import config from '../Utils/aws-exports';
import {logOut} from '../actions';
import {closeReadMoreModal,showReadMoreModal,closeImageModal,fetchtweets,tweetDetail,imageModal} from '../actions';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
Amplify.configure(config)


class AllTweetList extends Component{
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
    toggleModal=(Id)=>{
        const { AllTweetsReducer: {
          tweets
        }} = this.props;
        const tweetDetail=tweets.find((tweet) => tweet.id === Id);
        const image=tweetDetail.featured_image;
        this.props.imageModal(image,tweetDetail)
    }

    loadingSpin=new Animated.Value(0);

    spinAnimation(){
      this.loadingSpin.setValue(0);
      Animated.sequence([
        Animated.timing(
          this.loadingSpin,
          {
            toValue:1,
            duration:1500,
          }
        )
      ]).start(()=>this.spinAnimation());
    }

    storeData = async (key, tweets) => {
      tweets = JSON.stringify(tweets)
      Alert.alert(tweets);
      if (tweets) return AsyncStorage.setItem(key, tweets)
      else Alert.alert('Storage will be set next time'+tweets);
    }


    async componentDidMount() {
      this.spinAnimation();
      const { AllTweetsReducer: {
        tweetsAvailable
      }} = this.props;
      if(tweetsAvailable===false){
        this.props.fetchtweets();
      }
    }

    goToDetail=(Id)=>{
      const { AllTweetsReducer: {
        tweets
      }} = this.props;
      const gotoScreen='All'
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
      const width=Dimensions.get('window').width;
      const { AllTweetsReducer: {
        tweets,tweetsAvailable,imageModalVisibility,image,readMoreModalVisibility,tweet,emptyAllData
      }} = this.props;

      const spin=this.loadingSpin.interpolate({
          inputRange:[0,1],
          outputRange:['0deg','360deg']
      });

      if(emptyAllData===true)
      {
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:20}}>NO MATCHING RECORDS FOUND...</Text></View>
        );
      }
      if(tweetsAvailable===true)
      {
        imageUrl=image;
        return(
          <View style={styles.scrollContainer}>
              <FlatList
                data={tweets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <TweetItem onPress={()=>this.goToDetail(item.id)} onImagePress={()=>this.toggleModal(item.id)} tweet={item}/>}
                />
                {
                  imageModalVisibility && (
                    <Modal onRequestClose={this.props.closeImageModal} transparent={false} animationType='fade'>
                      <SafeAreaView style={styles.ImageModal}>
                        <TouchableOpacity onPress={this.props.closeImageModal} style={styles.closeModal}>
                          <FontAwesome name={'times-circle'} style={styles.closeImage}/>
                        </TouchableOpacity>
                        <ImageZoom cropWidth={width}
                                resizeMode='stretch'
                                 cropHeight={400}
                                 imageWidth={width}
                                 imageHeight={400}
                                 style={{flex:1,alignSelf: 'center',width:"100%"}}
                                 >
                           <FastImage
                             style={{width:'100%', height:'100%'}}
                             source={{
                               uri: imageUrl,
                               priority: FastImage.priority.normal,
                             }}
                             resizeMode={FastImage.resizeMode.contain}
                           />
                        </ImageZoom>
                        <Text style={styles.shortContent}>{tweet.content.slice(0,100)}</Text>
                        <TouchableOpacity onPress={this.props.showReadMoreModal} style={styles.closeModal}>
                          <Text style={styles.readMore}>Read More...</Text>
                        </TouchableOpacity>
                      </SafeAreaView>
                    </Modal>
                  )
                }
                {
                  readMoreModalVisibility && (
                    <Modal onRequestClose={this.props.closeReadMoreModal} transparent={false} >
                      <SafeAreaView>
                        <ScrollView style={styles.content}>
                        <TouchableOpacity onPress={this.props.closeReadMoreModal} style={styles.closeModal}>
                          <FontAwesome name={'times-circle'} style={styles.closeReadMore}/>
                        </TouchableOpacity>
                          <Text style={styles.contentMatter}>{tweet.content}</Text>
                        </ScrollView>
                      </SafeAreaView>
                    </Modal>
                  )
                }
          </View>
        );
      }
      return (
        <View style={styles.load}>
            <Animated.Image style={{transform: [{rotate:spin}],height:100,width:100}} source={require('../Image/circle.png')} />
        </View>
        // <View style={{backgroundColor:'grey',flex:1,alignItems: 'center',justifyContent: 'center',padding:20}}>
        //   <Animated.Image resizeMode='stretch' style={{transform: [{rotate:spin}] ,backgroundColor:'white' ,borderColor:'black',borderWidth:1,borderRadius:10,height:100,width:100}} source={require('../Image/logo.png')} />
        // </View>

      );
    }
}


const mapStateToProps=(state)=>{
  return{AllTweetsReducer: state.AllTweetsReducer}
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({closeReadMoreModal,showReadMoreModal,closeImageModal,logOut,fetchtweets,tweetDetail,imageModal},dispatch);
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
    load:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    ImageModal:{
      flex:1,
      backgroundColor:'black',
    },
    closeImage:{
      color:'white',
      fontSize:30,
      position:'absolute',
      top:10,
      right:10,
    },
    closeReadMore:{
      color:'black',
      fontSize:30,
      position:'absolute',
      top:10,
      right:10,
    },
    closeModal:{
      padding:20,
    },
    readMore:{
      color:'white',
      fontSize:20,
      position:'absolute',
      right:10,
      bottom:30,
    },
    content:{
      borderColor:"#bbb",
      borderWidth:1,
      borderRadius:7,
      backgroundColor:'white',
      marginBottom:20,
    },
    contentMatter:{
      marginHorizontal:10,
      fontSize:18,
      fontFamily: 'Cochin',
      color:'black',
    },
    shortContent:{
      color:'white',
      fontSize:15,
      marginHorizontal:20,
    }
});
