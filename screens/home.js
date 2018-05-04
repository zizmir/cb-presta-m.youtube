import React from 'react';
import { StyleSheet,
        Text,
        View ,
        Image ,
        ScrollView ,
        TouchableOpacity ,
        TextInput
      } from 'react-native';

import { CONFIG } from '../constants'


import { StackNavigator } from 'react-navigation';

export  class Home extends React.Component {

  static navigationOptions = ({navigation }) => {
    const { state, setParams, navigate } = navigation;

       return { headerStyle: { backgroundColor: "#f42627" }, headerLeft:
              <TouchableOpacity>
               <Image source={require("../assets/logo.png")} style={{ marginLeft: 10 }} />
             </TouchableOpacity>, headerRight: <View style={{ flexDirection: "row", marginRight: 30 }}>
             <TouchableOpacity style={{ paddingHorizontal: 5 }}>
               <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/hashtag.png")} />
             </TouchableOpacity>
             <TouchableOpacity style={{ paddingHorizontal: 5 }}>
               <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/love.png")} />
             </TouchableOpacity>

             <TouchableOpacity style={{ paddingHorizontal: 5 }}
               onPress={() => state.params.search()}
               >
               <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/search.png")} />
             </TouchableOpacity>
             <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate("Settings", {})}>
               <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/settings.png")} />
             </TouchableOpacity>
             <TouchableOpacity style={{ paddingHorizontal: 5 }}>
               <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/user.png")} />
             </TouchableOpacity>
           </View> };

      };
  constructor() {
    super();
    this.state = {
      movies: [],
      search : false,
      textSearch : null
    }
  }

  _search = () => {

    // this.setState({check: !this.state.search})
    console.log(this.state.search)
    this.setState(prevState => ({
      search: !prevState.search
    }));
  }
  _fetchForSearch = ( ) =>
  {

    const qb =  '&part=snippet,id&order=rating&maxResult=5&q='


    fetch(
      `${ CONFIG.YOUTUBE.BASE_URL }/search?key=${ CONFIG.YOUTUBE.API_KEY }${ qb }${this.state.textSearch}`
    )
    .then(res => res.json())
    .then(res => {
      const videos = []
      res.items.forEach(v => {
      videos.push(v)
    })
     this.setState({movies : videos})
    })
    .catch(error => {
      console.error(error);
    })
  }

  _toggleSearch()
  {
    if (this.state.search) {
        return (
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(textSearch) => this.setState({textSearch})}
            value={this.state.textSearch}
            onEndEditing={() => this._fetchForSearch( )}
          />

        );
      }
  }
  render() {
    const list =
          this.state.movies.map((movie, id) => {
            return (
              <View key={id} >

                <TouchableOpacity onPress={() =>
                  this.props.navigation.navigate('Video', { url :  movie.id.videoId })
                }>
                <Text style={ styles.ListText }> { movie.snippet.title} </Text>
                <Image
                 style={{ width: 350, height: 300 }}
                 source={{
                   uri: movie.snippet.thumbnails.high.url
                 }}
                 />
               </TouchableOpacity>
              </View>
            )
          })


    return(
      <View>
        {this._toggleSearch()}

        <ScrollView>
          { list }
        </ScrollView>
      </View>

    )
  }

  _fetchForHomeStart(BASE_URL, API_KEY ){
    const qb =  '&part=snippet,id&order=rating&maxResult&chart='
    fetch(
      `${ BASE_URL }/search?key=${ API_KEY }${ qb }$regionCode=FR`
    )
    .then(res => res.json())
    .then(res => {
      // console.log(res)
      const videos = []
      res.items.forEach(v => {
      videos.push(v)
    })
     this.setState({movies : videos})
    })
    .catch(error => {
      console.error(error);
    })

  }

  componentDidMount(){
    const { BASE_URL , API_KEY } = CONFIG.YOUTUBE

    // Loading video ...
    this._fetchForHomeStart(BASE_URL, API_KEY )
    // Parti affichage du textInput
    this.props.navigation.setParams({
      search: this._search
    })
  }

}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",

   paddingHorizontal: 10,
 },

 ListText: {
   alignItems: "center",
   color: '#000000',
   fontSize: 15,
   backgroundColor: '#f42627',
   color:"white",

   marginTop: 10,
   padding: 10,
 },
 title: {
   textAlign: 'center',
   fontSize: 20,
   marginTop: 50,
 },

 trend: {
   backgroundColor: '#262525',
   height: 40,
   paddingTop:15,
   textAlign:'center',
   color: '#f7f7f7',
 },
});
