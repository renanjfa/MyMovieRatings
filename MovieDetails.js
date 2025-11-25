import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

class MovieDetails extends Component {

    render() {
        const {filme} = this.props.route.params;

        return (
            <View>
                <Image
                    // key={index}
                    source={{ uri: "https://image.tmdb.org/t/p/w500" + filme.poster_path }}
                    style={{ width: 120, height: 220, borderRadius: 10, margin: 10 }}
                />
                <Text>
                    {filme.title}
                </Text>
                <Text>
                    {"Average Score: " + filme.vote_average}
                </Text>
                <Text>
                    {"Release Date: " + filme.release_date}
                    
                </Text>
            </View>
        );
    }

}

export default MovieDetails;