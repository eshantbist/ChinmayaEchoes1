import React,{Component} from 'react';
import {Alert,BackHandler,Dimensions,TouchableHighlight,Image,ScrollView,TouchableOpacity,Button,View,Text,FlatList,StyleSheet,Platform,Animated,Easing} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LogOutHeader from '../containers/LogOutHeader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import YouTube from 'react-native-youtube';
import ResponsiveImage from 'react-native-responsive-image';
import { ZoomableImage } from 'react-native-zoomable-image';
import ImageZoom from 'react-native-image-pan-zoom';
import FastImage from 'react-native-fast-image';

class TweetDetail extends Component{

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

    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        const { TweetDetailReducer: {
          gotoScreen
        }} = this.props;
        this.props.navigation.navigate(gotoScreen)
        return true;
      });

    }

    componentWillUnmount() {
      this.backHandler.remove();
    }

    onBack=()=>{
      const { TweetDetailReducer: {
        gotoScreen
      }} = this.props;
      this.props.navigation.navigate(gotoScreen)
    }

    onlogout=()=>{
      this.props.navigation.navigate('Auth');
    }

    render() {
        const { TweetDetailReducer: {
          tweet
        }} = this.props;
        const { TweetDetailReducer: {
          isVideo
        }} = this.props;
        const url=tweet.video_url

        const content = tweet.content.replace(/<[^>]*>/gm,'');
        const videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if(videoId != null) {
           console.log(videoId[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
        const width=Dimensions.get('window').width;
        return(
            <View style={styles.mainContainer}>
              <ScrollView>
                <TouchableOpacity onPress={()=>this.onBack()} style={styles.goBack}>
                  <Text style={styles.backLink}>
                    <FontAwesome name={'chevron-left'} style={styles.chevron}/>
                    Back
                  </Text>
                </TouchableOpacity>
                    <View>

                        {(tweet.video_url!=='')&&(
                          <View style={styles.titleView}>
                            <Text style={styles.title}>{tweet.post_title}</Text>
                          </View>
                        )}

                        <View style={styles.content}>
                          <Text style={styles.contentMatter}>{content}</Text>
                        </View>
                    </View>
              </ScrollView>
            </View>
        );
   }
}

const mapStateToProps=(state)=>{
  return{TweetDetailReducer: state.TweetDetailReducer,VideosTweetsReducer:state.VideosTweetsReducer}
}

export default connect(mapStateToProps)(TweetDetail);


const styles=StyleSheet.create({
  content:{
    marginHorizontal:10,
    marginVertical:10,
    padding:10,
    borderColor:"#bbb",
    borderWidth:1,
    borderRadius:7,
    backgroundColor:'white',
  },
  contentMatter:{
    fontSize:18,
    fontFamily: 'Cochin',
    color:'black',
  },
  titleView:{
    alignItems:'center',
    backgroundColor:'#bbb',
    padding:10,

  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
  },
  image:{
    height:400,
    width:'100%',
    overflow: 'visible',
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
