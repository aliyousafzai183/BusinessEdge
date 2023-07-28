import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import colors from '../../utils/colors';
import { handleForgotPassword } from '../../db/auth';

const { width, height } = colors;

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [activity, setActivity] = useState(false);

    const inputRef = useRef();

    const handleContinue = () => {
        if (email === "" || !email.includes('@')) {
            setEmailError('Enter a valid email');
            inputRef.current.shake();
        } else {
            setEmailError("");
            handleForgotPassword(email, navigation, setActivity);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Edge</Text>
            <Text style={styles.text}>Please enter your email address to reset your password.</Text>
            <Input
                ref={inputRef}
                placeholder='Email'
                onChangeText={value => setEmail(value)}
                errorMessage={emailError}
                leftIcon={{ type: 'font-awesome', name: 'envelope', color: colors.text }}
                style={styles.input}
            />
            {
                activity ?
                    <ActivityIndicator color={colors.white} size={'small'} />
                    :

                    <Button
                        title={"Continue"}
                        onPress={handleContinue}
                        buttonStyle={styles.button}
                    ></Button>
            }
        </View>
    )
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        width: 200
    },
});
