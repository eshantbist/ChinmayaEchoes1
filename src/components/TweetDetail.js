import React,{Component} from 'react';
import {Image,ScrollView,TouchableOpacity,Button,View,Text,FlatList,StyleSheet,Platform,Animated,Easing} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LogOutHeader from '../containers/LogOutHeader';

export default class TweetDetail extends Component{
    titleXPos=new Animated.Value(0);
    animatedTitle=(direction=1)=>{
    Animated.timing(
      this.titleXPos,
      {toValue: direction*75,
        duration:850,
        easing:Easing.spring
      }).start(({finished})=> {
        if(finished){
          this.animatedTitle(-1*direction);
        }
    });
  }
    onBack=()=>{
      this.props.navigation.navigate('TweetList')
    }

    onlogout=()=>{
      this.props.navigation.navigate('Auth');
    }

    render() {
      const tweet=this.props.navigation.state.params.tweet;
        return(
            <View style={styles.mainContainer}>
              <LogOutHeader onlogout={()=>this.onlogout()}/>
              <ScrollView>
                <TouchableOpacity onPress={()=>this.onBack()} style={styles.goBack}>
                  <Text style={styles.backLink}>
                    <FontAwesome name={'chevron-left'} style={styles.chevron}/>
                    Back
                  </Text>
                </TouchableOpacity>
                    <View>
                      <Image
                        source={{uri:tweet.featured_image}}
                        style={styles.image}/>
                      <View style={styles.titleView}>
                        <Text style={styles.title}>{tweet.post_title}</Text>
                      </View>
                      <View style={styles.content}>
                        <Text style={styles.contentMatter}>{tweet.content}</Text>
                      </View>
                    </View>
              </ScrollView>
            </View>
        );
   }
}


const styles=StyleSheet.create({
  content:{
    marginHorizontal:10,
    marginVertical:10,
    padding:10,
    borderColor:"#bbb",
    borderWidth:1,
    borderRadius:7,
    backgroundColor:'#476b6b',
  },
  contentMatter:{
    fontSize:18,
    fontFamily: 'Cochin',
    color:'white',
  },
  titleView:{
    alignItems:'center',
    backgroundColor:'#476b6b',
    padding:10,

  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  },
  image:{
    height:400,
    width:'100%',
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
mainContainer:{
  marginBottom:35,
  marginTop:Platform.OS === 'ios' ?20:0,
}
});
