
import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
 
import HomePage from './pages/home';
import SettingsPage from './pages/settings';
import TrackPage from './pages/track'

const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
    HomePage: { screen: HomePage }, 
    //First entry by default be our first screen if we do not define initialRouteName
    SettingsPage: { screen: SettingsPage }, 
    TrackPage: {screen: TrackPage},
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none',
    
  }
);
export default createAppContainer(App);