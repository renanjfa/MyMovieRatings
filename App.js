import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchMovies from './SearchMovies';
import Watchlist from './Watchlist';
import RatedMovies from './RatedMovies';


const Tab = createBottomTabNavigator();

export default class App extends Component {
  
  state = {
    ratedMovies: [],
    watchlist: []
  }

  async componentDidMount() {
    const saved = await AsyncStorage.getItem("RATED_MOVIES");
    if (saved) {
      this.setState({ 
        ratedMovies: JSON.parse(saved) 
      });
    }
  }

  saveRatedMovies = async (list) => {
    await AsyncStorage.setItem("RATED_MOVIES", JSON.stringify(list));
  };

  isOnRateMovie = (movie, rating) => {
    const updated = [
      ...this.state.ratedMovies.filter(m => m.id !== movie.id),
      { ...movie, rating } 
    ];
    this.setState({ ratedMovies: updated });
    this.saveRatedMovies(updated);
  };

  render() {

    return (
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen name="Search">
            {(props) => (
              <SearchMovies 
                {...props}
                ratedMovies={this.state.ratedMovies}
                isOnRateMovie={this.isOnRateMovie}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Watchlist">
            {() => <Watchlist/>}
          </Tab.Screen>
          
          <Tab.Screen name="Ratings">
            {() => <RatedMovies/>}
          </Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
