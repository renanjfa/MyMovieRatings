import React, {Component} from 'react';
import {Text, View, Image, Button} from 'react-native';

class MovieDetails extends Component {

    state = {
        rating: null
    }

    componentDidMount() {
        const { filme } = this.props.route.params;
        const { ratedMovies } = this.props;

        const rated = ratedMovies.find(m => m.id === filme.id);
        const nota = rated ? rated.rating : null;
        
        this.setState({
            rating: nota
        })
    }

    setRating = (nota) => {
        const { filme } = this.props.route.params;
        this.setState({
            rating: nota
        })
        this.props.isOnRateMovie(filme, nota);
    }

    render() {
        const { filme } = this.props.route.params;
    
        return (
            <View>
                <Image
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

                

                <Text>Nota atual: {this.state.rating || "Nenhuma"}</Text>

                <Button title="Dar nota 1" onPress={() => this.setRating(1)} />
                <Button title="Dar nota 2" onPress={() => this.setRating(2)} />
                <Button title="Dar nota 3" onPress={() => this.setRating(3)} />
                <Button title="Dar nota 4" onPress={() => this.setRating(4)} />
                <Button title="Dar nota 5" onPress={() => this.setRating(5)} />
            </View>
        );
    }

}

export default MovieDetails;