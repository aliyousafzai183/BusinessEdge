import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import RouteName from '../../routes/RouteName';

const LoginScreen = ({ navigation }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = () => {
        setEmailError('');
        setPasswordError('');

        // // Validate email
        // if (email === "" || !email.includes('@')) {
        //     emailRef.current.shake();
        //     setEmailError('Enter a valid email');
        // }

        // // Validate password
        // if (password === "" || password.length < 6) {
        //     passwordRef.current.shake();
        //     setPasswordError('Password should be at least 6 characters');
        // }

        navigation.navigate(RouteName.BOTTOM_TAB);

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.background} hidden={false} barStyle={'light-content'} />

            <Image source={require('../../utils/images/banner.png')} style={styles.Image} />
            <Text style={styles.title}>LOGIN NOW!</Text>

            <Input
                ref={emailRef}
                placeholder='Email'
                onChangeText={value => setEmail(value)}
                leftIcon={<Icon name="user" size={24} color={colors.text} />}
                placeholderTextColor={colors.dimWhite}
                style={styles.input}
                errorMessage={emailError}
                errorStyle={{ color: colors.text }}
            />

            <Input
                ref={passwordRef}
                placeholder='Password'
                onChangeText={value => setPassword(value)}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={colors.dimWhite}
                leftIcon={<Icon name="lock" size={24} color={colors.text} />}
                rightIcon={password.length > 0 &&
                    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={24} color={colors.text} />
                    </TouchableOpacity>
                }
                style={styles.input}
                errorMessage={passwordError}
                errorStyle={{ color: colors.text }}
            />

            <View style={styles.rememberForgotContainer}>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(!rememberMe)}>
                        <Text style={styles.checkboxText}>{rememberMe ? '✔️' : '⬜️'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>Remember me</Text>
                </View>

                <TouchableOpacity onPress={() => { navigation.navigate(RouteName.FORGOT_PASSWORD_SCREEN) }}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <Button
                title="Login"
                onPress={handleLogin}
                buttonStyle={styles.button}
            />

            <Text style={styles.signup}>Don't have an account?
                <Text style={styles.signupLink} onPress={() => { navigation.navigate(RouteName.SIGNUP_SCREEN) }}> Register Now!</Text>
            </Text>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    Image: {
        width: '100%',
        height: '20%',
        resizeMode: 'contain',
        marginVertical: colors.height * 0.05
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primary,
        marginBottom: colors.height * 0.03
    },
    input: {
        color: colors.text,
    },
    rememberForgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        alignItems: 'center'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignSelf: 'flex-end'
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        color: colors.white,
    },
    checkboxText: {
        color: colors.secondary
    },
    button: {
        backgroundColor: colors.primary,
        marginBottom: 10,
        width: 200,
        borderRadius: 100,
        marginTop: colors.height * 0.05
    },
    forgotPassword: {
        color: colors.secondary,
        marginBottom: 20,
    },
    signup: {
        color: colors.white,
        fontSize: 15,
        textAlign: 'center',
        marginTop: colors.height * 0.01
    },
    signupLink: {
        color: colors.secondary,
        marginLeft: 5,
    }
});
