import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import colors from '../utils/colors';

const { width, height } = colors;

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");

    const handleContinue = () => {
        // Handle password reset logic here
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Edge</Text>
            <Text style={styles.text}>Please enter your email address to reset your password.</Text>
            <Input
                placeholder='Email'
                onChangeText={value => setEmail(value)}
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                style={styles.input}
            />
            <Button
                title="Continue"
                onPress={handleContinue}
                buttonStyle={styles.button}
            />
        </View>
    )
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 20,
    },
    text: {
        color: colors.white,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        color: colors.text,
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
    },
});
