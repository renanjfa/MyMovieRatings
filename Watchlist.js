import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetails from './MovieDetails';
import WatchlistNavScreen from './WatchlistNavScreen';

const Watch = createStackNavigator();

class Watchlist extends Component {

    render() {
        return(
            <Watch.Navigator>

                <Watch.Screen name="WatchlistNavScreen" options={{ headerShown: false }}>
                    {(props) => (
                        <WatchlistNavScreen
                        {...props}
                        ratedMovies={this.props.ratedMovies}
                        isOnRateMovie={this.props.isOnRateMovie}
                        removeRatedMovie={this.props.removeRatedMovie}
                        watchlist={this.props.watchlist}
                        isOnWatchlist={this.props.isOnWatchlist}
                        removeWatchlist={this.props.removeWatchlist}
                        />
                    )} 
                </Watch.Screen>

                <Watch.Screen name="MovieDetails">
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
                </Watch.Screen>

            </Watch.Navigator>
        );
    }

}

export default Watchlist;