import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const { width, height } = colors;

const TodoScreen = () => {
    return (
        <View style={styles.container}>
            <Text>TodoScreen</Text>
        </View>
    )
}

export default TodoScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    }
})