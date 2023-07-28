import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import colors from '../../utils/colors';
import RouteName from '../../routes/RouteName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            checkId();
        }, 3000);
    }, [navigation]);

    const checkId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                navigation.navigate(RouteName.BOTTOM_TAB);
            } else {
                navigation.navigate(RouteName.LOGIN_SCREEN);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Image source={require('../../utils/images/splash.png')} style={styles.Image} />
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
});
