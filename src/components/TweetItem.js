import React,{Component} from 'react';
import {Image,ScrollView,TouchableOpacity,Button,View,Text,FlatList,StyleSheet,Platform,Animated,Easing} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TweetItem extends Component{

    render() {
        const { tweet }=this.props;
        return(
          <TouchableOpacity key={tweet.id} onPress={this.props.onPress} style={styles.tweet}>
            <View style={styles.info}>
              <Text style={styles.title}>{tweet.post_title}</Text>
              <Text style={styles.date}>{tweet.tweet_date}</Text>
              <Image
                    source={{uri:tweet.featured_image}}
                    style={{height:270, width:'100%'}}/>
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
      marginBottom:7,
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
});
