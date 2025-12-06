import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Button, StyleSheet} from 'react-native';
import StarButton from './StarButton';

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

    addToWatchlist = () => {
        const { filme } = this.props.route.params;
        this.props.isOnWatchlist(filme);
    }


    removerRatedMovie = () => {
        const { filme } = this.props.route.params;
        this.props.removeRatedMovie(filme.id);
        this.setState({rating: null});
    }

    removerWatchlist = () => {
        const { filme } = this.props.route.params;
        this.props.removeWatchlist(filme.id);
    }

    alreadyInWatchlist() {
        const { filme } = this.props.route.params;
        const {watchlist} = this.props;
        const f = watchlist.find(m => m.id === filme.id);
        return f ? true : false;
    }

    render() {
        const { filme } = this.props.route.params;

        return (
            <View style={styles.container}>
                
                {/* Poster */}
                <Image
                    source={{ uri: "https://image.tmdb.org/t/p/w500" + filme.poster_path }}
                    style={styles.poster}
                />

                {/* Conteúdo */}
                <View style={styles.infoContainer}>

                    <Text style={styles.title}>{filme.title}</Text>
                    <Text style={styles.overview}>{filme.overview}</Text>

                    <Text style={styles.detail}>⭐ Average Score: {filme.vote_average}</Text>
                    <Text style={styles.detail}>📅 Release Date: {filme.release_date}</Text>
                    <Text style={styles.detail}>🎯 Your Rating: {this.state.rating || "Nenhuma"}</Text>

                    {/* Rating */}
                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingLabel}>Your Rating:</Text>

                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <StarButton 
                                key={num} 
                                value={num} 
                                onPress={(v) => this.setRating(v)}
                            />
                        ))}
                    </View>

                    {/* Botões */}
                    <View style={styles.buttonsArea}>

                        {this.state.rating ? (
                            <Button
                                title="Excluir Avaliação"
                                color="#FF4444"
                                onPress={() => this.removerRatedMovie()}
                            />
                        ) : null}

                       

                        {this.alreadyInWatchlist() ? (
                            <TouchableOpacity 
                                style={[styles.customButton, { backgroundColor: "#4444FF" }]}
                                onPress={() => this.removerWatchlist()}
                            >
                                <Text style={styles.customButtonText}>Remove From Watchlist</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity 
                                style={[styles.customButton, { backgroundColor: "#5c5ceaff" }]}
                                onPress={() => this.addToWatchlist()}
                            >
                                <Text style={styles.customButtonText}>Add To Watchlist</Text>
                            </TouchableOpacity>
                        )}
                        
                    </View>

                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 12,
        backgroundColor: "#121212",
        flex: 1,
    },

    poster: {
        width: 450,
        height: 630,
        borderRadius: 12,
        marginRight: 16,
    },

    infoContainer: {
        flex: 1,
        flexDirection: "column",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10
    },

    overview: {
        fontSize: 16,
        color: "#CCCCCC",
        marginBottom: 16,
    },

    detail: {
        fontSize: 16,
        color: "#AAAAAA",
        marginBottom: 6,
    },

    ratingRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },

    ratingLabel: {
        color: "white",
        fontSize: 16,
        marginRight: 10,
    },

    buttonsArea: {
        marginTop: 20,
    },
    customButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    customButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});


export default MovieDetails;