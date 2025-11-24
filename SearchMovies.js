import React, { Component } from 'react';
import { Text, View, Image, TextInput, ScrollView, StyleSheet } from 'react-native';

class SearchMovies extends Component {

    state = {
        filmes: [],
        loading: false,
        busca: ''
    };

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

    componentDidMount() {
    this.listarFilmes();
  }

  listarFilmes = async () => {
    const API_KEY = "0672663f6a6265905425d77f1c69a75f";
    let filmesTotais = [];

    for (let pagina = 1; pagina <= 1; pagina++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${pagina}`
      );

      const data = await response.json();
      filmesTotais = filmesTotais.concat(data.results);
    }

    this.setState({
      filmes: filmesTotais,
      loading: false
    });
  };

    searchFilmes = async (title) => {
        try {
            this.setState({ loading: true });

            const API_KEY = "0672663f6a6265905425d77f1c69a75f";

            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${title}`
            );

            const data = await response.json();

            this.setState({
                filmes: data.results || [],
                loading: false
            });
        } catch (e) {
            console.log("Erro ao buscar filmes", e);
        }
    };

    render() {
        const { filmes, loading, busca } = this.state;

        return (
            <ScrollView>
                <TextInput
                    placeholder='Search Movies'
                    onChangeText={this.onChangeText}
                    style={styles.input}
                    value={busca}
                />

                <View style={{ padding: 20 }}>
                    {loading ? (
                        <Text>Carregando...</Text>
                    ) : (
                        filmes.map((filme, index) => (
                            <Image
                                key={index}
                                source={{ uri: "https://image.tmdb.org/t/p/w500" + filme.poster_path }}
                                style={{ width: 120, height: 220, borderRadius: 10, marginBottom: 10 }}
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        )
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

export default SearchMovies;
