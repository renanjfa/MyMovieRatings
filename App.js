import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, TextInput } from 'react-native-web';
import SearchMovies from './SearchMovies';

const Tab = createBottomTabNavigator();

export default class App extends Component {
  
  render() {

    return (
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen name="Search">
            {() => <SearchMovies/>}
          </Tab.Screen>

          <Tab.Screen name="Watchlist">
            {() => (
              <View style={{ padding: 20 }}>
                <Text>App de Filmes usando TMDB</Text>
              </View>
            )}
          </Tab.Screen>
          
          <Tab.Screen name="Ratings">
            {() => (
              <View style={{ padding: 20 }}>
                <Text>App de Filmes usando TMDB</Text>
              </View>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
