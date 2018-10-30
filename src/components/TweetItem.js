import React,{Component} from 'react';
import {Linking,Image,ScrollView,TouchableOpacity,Button,View,Text,FlatList,StyleSheet,Platform,Animated,Easing} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';

export default class TweetItem extends Component{
    render() {
        const { tweet }=this.props;
        let bottomMargin=7;
        if(tweet.video_url===''){
          bottomMargin=20;
        }
        return(
          <TouchableOpacity key={tweet.id} onPress={this.props.onPress} style={styles.tweet}>
            <View style={styles.info}>
              {(tweet.video_url!=='')&&(<Text style={styles.title}>{tweet.post_title}</Text>)}
              <Text style={[styles.date,{marginBottom:bottomMargin}]}>{tweet.tweet_date}</Text>
              <TouchableOpacity style={styles.registerButton} onPress={() => Linking.openURL('http://www.chinmayamission.com')}>
                <Text>Register</Text>
              </TouchableOpacity>
              <FastImage
                style={{height:300, width:'100%'}}
                source={{
                  uri: tweet.featured_image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
              <Text style={styles.content}>{tweet.content.slice(0,100)}</Text>
            </View>
            <View style={styles.readMore}>
                <Text style={{color:'#999999'}} >Read More...</Text>
            </View>
          </TouchableOpacity>
        );
    }
}


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
  }
});
