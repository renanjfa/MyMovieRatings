import React, {Component} from 'react';
import {Text, Image, TouchableHighlight, ScrollView, View} from 'react-native';

class RatedNavScreen extends Component {

    render() {
        const filmes = this.props.ratedMovies;
        const {navigation} = this.props;

        return(
            <ScrollView>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                
                    
                
                    {filmes.map((filme, index) => (
                        <TouchableHighlight key={index} onPress={() => navigation.navigate("MovieDetails", { filme })}>
                            <View style={{alignItems: "center"}}>

                            <Image
                                source={{ uri: "https://image.tmdb.org/t/p/w500" + filme.poster_path }}
                                style={{ width: 120, height: 220, borderRadius: 10, margin: 10 }}
                            />
                            <Text>{filme.rating}</Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                
                </View>
            </ScrollView>
        )
    }
}

export default RatedNavScreen;