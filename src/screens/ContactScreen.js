import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const { width, height } = colors;

const ContactScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ContactScreen</Text>
        </View>
    )
}

export default ContactScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    }
})