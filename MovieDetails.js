import React, {Component} from 'react';
import {Text, View, Image, Button} from 'react-native';
import { ScrollView } from 'react-native-web';

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

    // addToWatchlist = () => {
    //     const { filme } = this.props.route.params;
    //     this.props.isOnWatchlist(filme);
    // }

    addToWatchlist = () => {
        const { filme } = this.props.route.params;
        
        // Verifica se a função existe
        if (this.props.isOnWatchlist) {
            this.props.isOnWatchlist(filme);
            console.log('Tentando adicionar à watchlist:', filme.title); // Debug
        } else {
            console.error('isOnWatchlist não está disponível nas props');
        }
    };

    removerRatedMovie = () => {
        const { filme } = this.props.route.params;
        this.props.removeRatedMovie(filme.id);
        this.setState({rating: null});
    }

    removerWatchlist = () => {
        const { filme } = this.props.route.params;
        this.props.removeWatchlist(filme.id);
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
                    {"Overview: " + filme.overview}
                </Text>
                <Text>
                    {"Average Score: " + filme.vote_average}
                </Text>
                <Text>
                    {"Release Date: " + filme.release_date}

                </Text>

                

                <Text>Nota atual: {this.state.rating || "Nenhuma"}</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>

                <Text>Your Rating: </Text>
                <Button title="1" onPress={() => this.setRating(1)} />
                <Button title="2" onPress={() => this.setRating(2)} />
                <Button title="3" onPress={() => this.setRating(3)} />
                <Button title="4" onPress={() => this.setRating(4)} />
                <Button title="5" onPress={() => this.setRating(5)} />
                <Button title="6" onPress={() => this.setRating(6)} />
                <Button title="7" onPress={() => this.setRating(7)} />
                <Button title="8" onPress={() => this.setRating(8)} />
                <Button title="9" onPress={() => this.setRating(9)} />
                <Button title="10" onPress={() => this.setRating(10)} />


            </View>
            <View style={{flexDirection: "column", flexWrap: "wrap", justifyContent: "flex-start"}}>
                {this.state.rating ? (
                    <Button title="Excluir Avaliacao" onPress={() => {this.removerRatedMovie(); this.props.navigation.goBack()}}/>
                ) : (
                    <Text></Text>
                )}
                <Button title="Add To Watchlist" onPress={() => this.addToWatchlist()}/>
                <Button title="Retirar Watchlist" onPress={() => this.removerWatchlist()}/>
            </View>
            </View>
        );
    }

}

export default MovieDetails;