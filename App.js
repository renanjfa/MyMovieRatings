import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SearchMovies from './SearchMovies';
// import Watchlist from './Watchlist';
// import RatedMovies from './RatedMovies';

const Tab = createBottomTabNavigator();

export default class App extends Component {
  
  render() {

    return (
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen 
            name="Search" 
            component={SearchMovies} 
          />

          {/* <Tab.Screen name="Watchlist">
            {() => <Watchlist/>}
          </Tab.Screen>
          
          <Tab.Screen name="Ratings">
            {() => <RatedMovies/>}
          </Tab.Screen> */}

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
