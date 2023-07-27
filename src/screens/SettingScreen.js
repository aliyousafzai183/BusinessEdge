import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const { width, height } = colors;

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>SettingScreen</Text>
        </View>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    }
})