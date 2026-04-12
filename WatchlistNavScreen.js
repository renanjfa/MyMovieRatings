import React, {Component} from 'react';
import {Text, Image, TouchableOpacity, ScrollView, View, StyleSheet} from 'react-native';

class WatchlistNavScreen extends Component {

    render() {
        const filmes = this.props.watchlist || [];
        const {navigation} = this.props;

        return(
            <View style={styles.container}>
                <Text style={styles.header}>Watchlist</Text>

                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.grid}>
                    
                    {filmes.map((filme, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("MovieDetails", { filme })}
                        >
                            <Image
                                source={{ uri: "https://image.tmdb.org/t/p/w500" + filme.poster_path }}
                                style={styles.poster}
                            />

                            <Text numberOfLines={2} style={styles.title}>
                                {filme.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    
                    </View>
                </ScrollView>
            </View>

        )
    }
}

export default WatchlistNavScreen;

const styles = StyleSheet.create({
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