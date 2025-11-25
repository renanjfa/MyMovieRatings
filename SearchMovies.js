import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieNavScreen from './MovieNavScreen';
import MovieDetails from './MovieDetails';

const Stack = createStackNavigator();

class SearchMovies extends Component {
    render() {
        return (
            <Stack.Navigator>

                <Stack.Screen
                    name="MovieNavScreen"
                    options={{ headerShown: false }}
                    children={(props) => <MovieNavScreen {...props} />}
                />

                <Stack.Screen
                    name="MovieDetails"
                    children={(props) => <MovieDetails {...props} />}
                />

            </Stack.Navigator>
        );
    }
}

export default SearchMovies;
