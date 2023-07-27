import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import colors from '../utils/colors';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('NextScreen'); // Replace 'NextScreen' with the screen you want to navigate to.
        }, 3000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Icon 
                name='rocket'
                type='font-awesome' 
                size={50}
                color={colors.white} 
            />
            <Text style={styles.title}>Business Edge</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        position: 'absolute',
        bottom: 30,
    },
});
