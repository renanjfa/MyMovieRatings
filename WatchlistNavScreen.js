import React, {Component} from 'react';
import {Text, Image, TouchableHighlight, ScrollView, View} from 'react-native';

class WatchlistNavScreen extends Component {

    render() {
        const filmes = this.props.watchlist || [];
        const {navigation} = this.props;

        return(
            <ScrollView>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                
                    
                 
                    {filmes.map((filme, index) => (
                        <TouchableHighlight key={index} onPress={() => navigation.navigate("MovieDetails", { filme })}>
                            <Image
                                source={{ uri: "https://image.tmdb.org/t/p/w500" + filme.poster_path }}
                                style={{ width: 120, height: 220, borderRadius: 10, margin: 10 }}
                            />
                        </TouchableHighlight>
                    ))}
                
                </View>
            </ScrollView>
        )
    }
}

export default WatchlistNavScreen;