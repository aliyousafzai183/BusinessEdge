import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import RouteName from '../../routes/RouteName';
import { SignUp } from '../../db/auth';

const SignupScreen = ({ navigation }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [activity, setActivity] = useState(false);

    const handleSignup = () => {
        let hasError = false;
        setEmailError('');
        setPasswordError('');

        if (email === "" || !email.includes('@')) {
            emailRef.current.shake();
            setEmailError('Enter a valid email');
            hasError = true;
        } else {
            setEmailError("");
        }

        if (password === "" || password.length < 6) {
            passwordRef.current.shake();
            setPasswordError('Password should be at least 6 characters');
            hasError = true;
        } else {
            setPasswordError("");
        }

        if (!hasError) {
            SignUp(email, password, navigation, setActivity);
        }

    }

    return (
        <View style={styles.container}>
            <Image source={require('../../utils/images/banner.png')} style={styles.Image} />
            <Text style={styles.title}>SIGN UP NOW!</Text>

            <Input
                ref={emailRef}
                placeholder='Email'
                onChangeText={value => setEmail(value)}
                leftIcon={<Icon name="user" size={24} color={colors.text} />}
                placeholderTextColor={colors.dimWhite}
                inputStyle={styles.input}
                errorMessage={emailError}
                errorStyle={{ color: colors.text }}
            />

            <Input
                ref={passwordRef}
                placeholder='Password'
                onChangeText={value => setPassword(value)}
                secureTextEntry={secureTextEntry}
                leftIcon={<Icon name="lock" size={24} color={colors.text} />}
                rightIcon={
                    password.length > 0 &&
                    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={24} color={colors.text} />
                    </TouchableOpacity>
                }
                inputStyle={styles.input}
                placeholderTextColor={colors.dimWhite}
                errorMessage={passwordError}
                errorStyle={{ color: colors.text }}
            />

            {
                activity ?
                    <ActivityIndicator color={colors.white} size={'small'} />
                    :

                    <Button
                        title={"Signup"}
                        onPress={handleSignup}
                        buttonStyle={styles.button}
                    ></Button>
            }


            <Text style={styles.alreadyAccount}>Already have an account?
                <Text style={styles.loginLink} onPress={() => { navigation.navigate(RouteName.LOGIN_SCREEN) }}> Login Now!</Text>
            </Text>
            <View style={styles.tosContainer}>
                <Text style={styles.tos}>By signing up, you agree to our </Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.tosLink}>TOS</Text>
                </TouchableOpacity>
                <Text style={styles.tos}> and </Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.tosLink}>Privacy Policies</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupScreen;

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
    button: {
        backgroundColor: colors.primary,
        marginBottom: 10,
        width: 200,
        borderRadius: 100,
        marginTop: colors.height * 0.05
    },
    tosContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: colors.height * 0.2,
        flexWrap: 'wrap'
    },
    tos: {
        color: colors.white,
        fontSize: 15,
        textAlign: 'center',
    },
    tosLink: {
        color: colors.secondary,
        fontSize: 15,
        textAlign: 'center',
    },
    alreadyAccount: {
        color: colors.white,
        fontSize: 15,
        textAlign: 'center',
        marginTop: colors.height * 0.01
    },
    loginLink: {
        color: colors.secondary,
        marginLeft: 5,
    }
});
