import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const { width, height } = colors;

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen Profit & Loss</Text>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    }
})