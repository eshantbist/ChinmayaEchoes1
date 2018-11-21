import React,{Component} from 'react';
import {ImageBackground,Dimensions,SafeAreaView,Modal,Linking,Image,ScrollView,TouchableOpacity,Button,View,Text,FlatList,StyleSheet,Platform,Animated,Easing} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import {connect} from 'react-redux';

class TweetItem extends Component{
    state = {
      modalVisibility:false,
    }
    render() {
        const { tweet }=this.props;
        let bottomMargin=7;
        if(tweet.video_url===''){
          bottomMargin=20;
        }
        const content = tweet.content.replace(/<[^>]*>/gm,'');
        const videoUrl=tweet.video_url
        const lastIndex = videoUrl.lastIndexOf(".");
        const extension=videoUrl.slice(lastIndex+1);
        let url=tweet.register_url;
        return(
          <View key={tweet.id} style={styles.tweet}>
            <View style={styles.info}>
              <Text style={[styles.date,{marginBottom:bottomMargin}]}>{tweet.tweet_date}</Text>
              {(tweet.register_url!=='')&&(<TouchableOpacity style={styles.registerButton} onPress={() => Linking.openURL(url)}>
                <Text>Register</Text>
              </TouchableOpacity>)}
              {(videoUrl==='')?<TouchableOpacity onPress={this.props.onImagePress}>
                <FastImage
                  style={{height:300, width:'100%'}}
                  source={{
                    uri: tweet.featured_image,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
              : <View style={{marginTop:10}}>
                  <ImageBackground
                      source={{uri: tweet.featured_image}}
                      style={{resizeMode: 'cover',height:300, width:'100%'}}>
                      <TouchableOpacity onPress={this.props.onPress} style={styles.chevronView}>
                        <FontAwesome name={'play-circle'} style={styles.chevron} />
                      </TouchableOpacity>
                  </ImageBackground>
                  </View>
              }
              <Text style={styles.content}>{content.slice(0,100)}</Text>
            </View>
            <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.readMore}>
                <Text style={{color:'#999999'}} >Read More...</Text>
            </View>
            </TouchableOpacity>
          </View>
        );
    }
}

const mapStateToProps=(state)=>{
  return{AllTweetsReducer: state.AllTweetsReducer}
}

export default connect(mapStateToProps)(TweetItem);


const styles=StyleSheet.create({
  tweet:{
      marginHorizontal:10,
      marginTop:10,
  },
  info:{
      padding:10,
      backgroundColor:"#fff",
      borderColor:"#bbb",
      borderWidth:1,
      borderTopWidth:0,
      borderBottomWidth:0,
      borderBottomStartRadius:0,
      borderBottomEndRadius:0,
      borderRadius:7,
  },
  title:{
      fontSize:16,
      fontWeight:'bold',
      marginBottom:5,
  },
  image:{
      height:250,
      width:'100%',
  },
  date:{
      fontSize:12,
      fontWeight:'bold',
      color:'grey',
  },
  readMore:{
      padding:10,
      backgroundColor:'#f2f2f2',
      borderWidth:1,
      borderColor:"#bbb",
      borderTopWidth:0,
      borderBottomStartRadius:7,
      borderBottomEndRadius:7,
  },
  content:{
      fontSize:18,
      fontFamily:Platform.OS === 'ios' ? 'cochin' : 'sans-serif-condensed',
      marginTop:10,
  },
  registerButton:{
    position:'absolute',
    right:10,
    top:10,
    borderColor:'#bbb',
    borderWidth:1,
    padding:5,
    borderRadius:10,
    width:100,
    alignItems:'center',
    backgroundColor:'#f2f2f2'
  },
  modal:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  chevronView:{
    flex:1,
    fontSize:100,
    alignItems:'flex-end',
    justifyContent:'flex-end',
    right:5,
  },
  chevron:{
    color: 'rgba(0,0,0,0.6)',
    fontSize:50,
  }
});
