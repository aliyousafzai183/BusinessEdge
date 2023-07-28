import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import RouteName from '../../routes/RouteName';
import { createUser } from '../../db/auth';

const UserName = ({ navigation }) => {
    const usernameRef = useRef();
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [activity, setActivity] = useState(false);

    const handleLogin = () => {
        let hasError = false;
        setUsernameError('');

        if (username.length < 5 || username.length > 40) {
            usernameRef.current.shake();
            setUsernameError('Enter a valid username between 5 & 40 characters.');
            hasError = true;
        } else {
            setUsernameError("");
        }

        if (!hasError) {
            console.log("calling");
            createUser(username, navigation, setActivity);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.background} hidden={false} barStyle={'light-content'} />

            <Image source={require('../../utils/images/banner.png')} style={styles.Image} />
            <Text style={styles.title}>Enter Your Username!</Text>

            <Input
                ref={usernameRef}
                placeholder='Username'
                onChangeText={value => setUsername(value)}
                leftIcon={<Icon name="user" size={24} color={colors.text} />}
                placeholderTextColor={colors.dimWhite}
                style={styles.input}
                errorMessage={usernameError}
                errorStyle={{ color: colors.text }}
            />

            {
                activity ?
                    <ActivityIndicator color={colors.white} size={'small'} />
                    :

                    <Button
                        title={"Continue"}
                        onPress={handleLogin}
                        buttonStyle={styles.button}
                    ></Button>
            }

        </View>
    )
}

export default UserName;

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
