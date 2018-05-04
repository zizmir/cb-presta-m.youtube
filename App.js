import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Home } from './screens/home'
import { Video } from './screens/video'
import { Settings } from './screens/settings'

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Video: {
      screen: Video,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }

}
