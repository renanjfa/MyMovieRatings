import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RatedNavScreen from './RatedNavScreen';
import MovieDetails from './MovieDetails';

const Ratings = createStackNavigator();

class RatedMovies extends Component {

    render() {
        return(
            <Ratings.Navigator>

                <Ratings.Screen name="RatedNavScreen" options={{ headerShown: false }}>
                    {(props) => (
                        <RatedNavScreen
                        {...props}
                        ratedMovies={this.props.ratedMovies}
                        isOnRateMovie={this.props.isOnRateMovie}
                        removeRatedMovie={this.props.removeRatedMovie}
                        watchlist={this.props.watchlist}
                        isOnWatchlist={this.props.isOnWatchlist}
                        removeWatchlist={this.props.removeWatchlist}
                        />
                    )}
                </Ratings.Screen>

                <Ratings.Screen name="MovieDetails">
                    {(props) => (
                        <MovieDetails
                        {...props}
                        ratedMovies={this.props.ratedMovies}
                        isOnRateMovie={this.props.isOnRateMovie}
                        removeRatedMovie={this.props.removeRatedMovie}
                        />
                    )}
                </Ratings.Screen>

            </Ratings.Navigator>
        );
    }

}

export default RatedMovies;