import React, {Component} from 'react';
import {Text, Image, TouchableOpacity, ScrollView, View, StyleSheet} from 'react-native';

class RatedNavScreen extends Component {

    render() {
        const filmes = this.props.ratedMovies;
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Your Rated Movies</Text>

                <ScrollView contentContainerStyle={styles.scroll}>

                    <View style={styles.grid}>

                        {filmes.toReversed().map((filme, index) => (
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

                                <View style={styles.ratingBadge}>
                                    <Text style={styles.ratingText}>{filme.rating}</Text>
                                </View>

                                <Text numberOfLines={2} style={styles.title}>
                                    {filme.title}
                                </Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default RatedNavScreen;


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
        marginBottom: 20,
        paddingHorizontal: 4,
    },

    ratingBadge: {
        position: "relative",
        bottom: 23,
        left: 0,
        backgroundColor: "#837718ff",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 40,
        elevation: 4,
    },

    ratingText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    }
});
