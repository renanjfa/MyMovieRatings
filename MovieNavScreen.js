import React, {Component} from 'react';
import { View, Text, TextInput, TouchableHighlight, ScrollView, Image, StyleSheet } from 'react-native';

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
            
            <ScrollView>
                <TextInput
                    placeholder='Search'
                    onChangeText={this.onChangeText}
                    style={styles.input}
                    value={busca}
                />

                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                {loading ? (
                    <Text>Carregando...</Text>
                ) : (
                    filmes.map((filme, index) => (
                        <TouchableHighlight key={index} onPress={() => navigation.navigate("MovieDetails", { filme })}>
                            <Image
                                source={{ uri: "https://image.tmdb.org/t/p/w500" + filme.poster_path }}
                                style={{ width: 120, height: 220, borderRadius: 10, margin: 10 }}
                            />
                        </TouchableHighlight>
                    ))
                )}
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginHorizontal: 20
    }
});

export default MovieNavScreen;