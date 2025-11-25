import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RatedNavScreen from './RatedNavScreen';
import MovieDetails from './MovieDetails';

const Stack = createStackNavigator();

class RatedMovies extends Component {

    render() {
        return(
            <Stack.Navigator>

                <Stack.Screen name="RatedNavScreen" options={{ headerShown: false }}>
                    {(props) => (
                        <RatedNavScreen
                        {...props}
                        ratedMovies={this.props.ratedMovies}
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
                        />
                    )}
                </Stack.Screen>

            </Stack.Navigator>
        );
    }

}

export default RatedMovies;