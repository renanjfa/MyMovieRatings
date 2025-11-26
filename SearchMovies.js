import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieNavScreen from './MovieNavScreen';
import MovieDetails from './MovieDetails';

const Stack = createStackNavigator();

class SearchMovies extends Component {
    render() {
        return (
            <Stack.Navigator>

                <Stack.Screen name="MovieNavScreen" options={{ headerShown: false }}>
                    {(props) => (
                        <MovieNavScreen
                        {...props}
                        ratedMovies={this.props.ratedMovies}
                        isOnRateMovie={this.props.isOnRateMovie}
                        removeRatedMovie={this.props.removeRatedMovie}
                        watchlist={this.props.watchlist}
                        isOnWatchlist={this.props.isOnWatchlist}
                        removeWatchlist={this.props.removeWatchlist}
                        />
                    )}
                </Stack.Screen>

                <Stack.Screen name="MovieDetails">
                    {(props) => (
                        <MovieDetails
                        {...props}
                        ratedMovies={this.props.ratedMovies}
                        isOnRateMovie={this.props.isOnRateMovie}
                        removeRatedMovie={this.props.removeRatedMovie}
                        watchlist={this.props.watchlist}
                        isOnWatchlist={this.props.isOnWatchlist}
                        removeWatchlist={this.props.removeWatchlist}
                        />
                    )}
                </Stack.Screen>

            </Stack.Navigator>
        );
    }
}

export default SearchMovies;
