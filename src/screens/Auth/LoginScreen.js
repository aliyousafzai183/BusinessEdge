import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import colors from '../utils/colors';

const { width, height } = colors;

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        // Handle login logic here
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Edge</Text>

            <Input
                placeholder='Email'
                onChangeText={value => setEmail(value)}
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                style={styles.input}
            />
            <Input
                placeholder='Password'
                onChangeText={value => setPassword(value)}
                secureTextEntry={secureTextEntry}
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                rightIcon={
                    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <Icon type='font-awesome' name={secureTextEntry ? 'eye-slash' : 'eye'} />
                    </TouchableOpacity>
                }
                style={styles.input}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Remember me</Text>
            </View>
            <Button
                title="Login"
                onPress={handleLogin}
                buttonStyle={styles.button}
            />
            <TouchableOpacity onPress={() => {}}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <Text style={styles.signup}>Don't have an account? 
                <Text style={styles.signupLink} onPress={() => {}}> SignUp Now!</Text>
            </Text>
        </View>
    )
}

export default LoginScreen;

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
    input: {
        color: colors.text,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        color: colors.white,
    },
    button: {
        backgroundColor: colors.primary,
        marginBottom: 10,
    },
    forgotPassword: {
        color: colors.secondary,
        marginBottom: 20,
    },
    signup: {
        color: colors.white,
        fontSize: 12,
        textAlign: 'center',
    },
    signupLink: {
        color: colors.secondary,
        marginLeft: 5,
    }
});
