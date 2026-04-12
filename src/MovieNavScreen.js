import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const API_KEY = "0672663f6a6265905425d77f1c69a75f";

class MovieNavScreen extends Component {

    state = {
        busca: '',
        filmes: [],
        loading: true
    }

    componentDidMount() {
        this.listarFilmes();
    }

    onChangeText = (value) => {
        this.setState({ busca: value }, () => {
            if (value.length >= 2) {
                this.searchFilmes(value);
            }
            else {
                this.listarFilmes();
            }
        });
    };

    listarFilmes = async () => {
        let filmesTodos = [];

        for (let pagina = 1; pagina <= 2; pagina++) {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pagina}`
        );

        const data = await response.json();
        filmesTodos = filmesTodos.concat(data.results);
        }

        this.setState({
            filmes: filmesTodos,
            loading: false
        });
    };

    searchFilmes = async (title) => {
        
        this.setState({ loading: true });

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${title}`
        );

        const data = await response.json();

        this.setState({
            filmes: data.results || [],
            loading: false
        });
    };

    render() {
        const { filmes, loading, busca } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Search For Movies</Text>

                <TextInput
                    placeholder='Search'
                    onChangeText={this.onChangeText}
                    style={styles.input}
                    value={busca}
                />

                <ScrollView contentContainerStyle={styles.scroll}>

                    <View style={styles.grid}>
                    {loading ? (
                        <Text>Carregando...</Text>
                    ) : (
                        
                        filmes.map((filme, index) => (
                            <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate("MovieDetails", { filme })}>
                                {filme.poster_path ? (

                                    <Image
                                        source={{ uri: "https://image.tmdb.org/t/p/w500" + filme.poster_path }}
                                        style={styles.poster}
                                    />
                                ) : (
                                    <View style={{ width: 150, height: 230, margin: 10 , alignItems: "center", justifyContent: "center", backgroundColor: "#7e7373ff", borderRadius: 8}}>
                                        <Text style={{color:"white", fontWeight: "bold"}}>No Poster Available</Text>
                                    </View>
                                )}
                                <Text numberOfLines={2} style={styles.title}>
                                    {filme.title}
                                </Text>
                                
                            </TouchableOpacity>
                        ))
                    )}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default MovieNavScreen;

const styles = StyleSheet.create({
    input: {
        marginTop: 5,
        marginBottom: 10,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        padding: 10,
        backgroundColor: '#9b9250b7',
        borderRadius: 8,
        marginHorizontal: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
        paddingTop: 20,
    },

    header: {
        color: "#837718ff",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },

    scroll: {
        paddingBottom: 50,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    card: {
        width: 150,
        margin: 10,
        alignItems: "center",
    },

    poster: {
        width: 150,
        height: 240,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: "#222",
        elevation: 6,
    },

    title: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 4,
        paddingHorizontal: 4,
    },

});