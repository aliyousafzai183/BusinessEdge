import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import colors from '../../utils/colors';
import RouteName from '../../routes/RouteName';

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(RouteName.LOGIN_SCREEN);
        }, 3000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Image source={require('../../utils/images/splash.png')} style={styles.Image} />
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Image: {
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
});
