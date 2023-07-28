import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';

const TodoItem = ({ item, onItemPress }) => {
    return (
        <TouchableOpacity style={styles.todo} onPress={onItemPress}>
            <Icon name={'circle-thin'} size={20} color={colors.text} />
            <Text style={styles.todoText}>{item.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        borderColor: colors.dimWhite,
        borderWidth: 1,
    },
    todoText: {
        marginLeft: 10,
        fontSize: 16,
        color: colors.text
    },
});

export default TodoItem;
