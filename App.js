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
    const savedRated = await AsyncStorage.getItem("RATED_MOVIES");
    const savedWatchlist = await AsyncStorage.getItem("WATCHLIST");

    if (savedRated) {
      this.setState({ 
        ratedMovies: JSON.parse(savedRated)
      });
    }

    if (savedWatchlist) {
      this.setState({ 
        watchlist: JSON.parse(savedWatchlist) 
      });
    }
  }

  saveRatedMovies = async (list) => {
    await AsyncStorage.setItem("RATED_MOVIES", JSON.stringify(list));
  };

  saveWatchlist = async(list) => {
    await AsyncStorage.setItem("WATCHLIST", JSON.stringify(list));
  };

  isOnRateMovie = (movie, rating) => {
    const updated = [
      ...this.state.ratedMovies.filter(m => m.id !== movie.id),
      { ...movie, rating } 
    ];
    this.setState({ ratedMovies: updated });
    this.saveRatedMovies(updated);
  };

  // isOnWatchlist = (movie) => {
  //   const updated = [...this.state.watchlist, { ...movie }];
  //       this.setState({ watchlist: updated });
  //       this.saveWatchlist(updated);
  // };

  isOnWatchlist = (movie) => {
    // Verifica se o filme já está na watchlist
    const alreadyInWatchlist = this.state.watchlist.some(m => m.id === movie.id);
    
    if (!alreadyInWatchlist) {
        // Se não está, adiciona o filme
        const updated = [...this.state.watchlist, { ...movie }];
        this.setState({ watchlist: updated });
        this.saveWatchlist(updated);
        console.log('Filme adicionado à watchlist:', movie.title); // Debug
    } else {
        console.log('Filme já está na watchlist:', movie.title); // Debug
    }
};

  removeRatedMovie = (movieId) => { 
    const updated = this.state.ratedMovies.filter(m => m.id !== movieId);
    this.setState({ ratedMovies: updated });
    this.saveRatedMovies(updated);
  };

  removeWatchlist = (movieId) => {
    const updated = this.state.watchlist.filter(m => m.id !== movieId);
    this.setState({ watchlist: updated });
    this.saveWatchlist(updated);
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
                removeRatedMovie={this.removeRatedMovie}
                watchlist={this.state.watchlist}
                isOnWatchlist={this.isOnWatchlist}
                removeWatchlist={this.removeWatchlist}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Watchlist">
            {(props) => (
              <Watchlist 
                {...props}
                ratedMovies={this.state.ratedMovies}
                isOnRateMovie={this.isOnRateMovie}
                removeRatedMovie={this.removeRatedMovie}
                watchlist={this.state.watchlist}
                isOnWatchlist={this.isOnWatchlist}
                removeWatchlist={this.removeWatchlist}
              />
            )}
          </Tab.Screen>
          
          <Tab.Screen name="Ratings">
            {(props) => (
              <RatedMovies 
                {...props}
                ratedMovies={this.state.ratedMovies}
                isOnRateMovie={this.isOnRateMovie}
                removeRatedMovie={this.removeRatedMovie}
                watchlist={this.state.watchlist}
                isOnWatchlist={this.isOnWatchlist}
                removeWatchlist={this.removeWatchlist}
              />
            )}
          </Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
