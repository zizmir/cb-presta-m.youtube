import React from 'react';
import { WebView , Text } from 'react-native';


export  class Video extends React.Component {

  render() {
    const { params } = this.props.navigation.state;

      return (

        <WebView
          source={{uri: `https://www.youtube.com/watch?v=${params.url}` }}
          style={{marginTop: 20}}
        />
      )
  }

}
