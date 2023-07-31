import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import colors from '../utils/colors';

const QuotesScreen = () => {
    const [quote, setQuote] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getQuote = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://api.quotable.io/random');
            setQuote(response.data);
            setError(null);
        } catch (error) {
            // console.error(error);
            setError('Network error. Please connect to the internet and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getQuote();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <Button
                    title="Retry"
                    buttonStyle={styles.retryButton}
                    titleStyle={styles.buttonText}
                    onPress={getQuote}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.shareButton}>
                <Icon name="share-alt" size={24} color={colors.white} />
            </TouchableOpacity> */}
            <Text style={styles.quoteText}>{quote.content}</Text>
            <Text style={styles.authorText}>{quote.author}</Text>
            <Button
                title="Next Quote"
                buttonStyle={styles.nextButton}
                titleStyle={styles.buttonText}
                onPress={getQuote}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareButton: {
        position: 'absolute',
        top: 30,
        right: 30,
    },
    quoteText: {
        fontSize: 24,
        color: colors.text,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    authorText: {
        fontSize: 18,
        color: colors.dimWhite,
        textAlign: 'center',
        marginTop: 20,
    },
    nextButton: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: colors.primary,
    },
    buttonText: {
        color: colors.white,
    },
    errorText: {
        color: colors.text,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    retryButton: {
        marginTop: 20,
        backgroundColor: colors.primary,
    },
});

export default QuotesScreen;
