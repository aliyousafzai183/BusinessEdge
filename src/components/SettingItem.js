// SettingOption.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';

const { width } = colors;

const SettingItem = ({ title, iconName, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Icon name={iconName} size={24} color={colors.text} />
        <Text style={styles.cardTitle}>{title}</Text>
        <Icon name="chevron-right" size={15} color={colors.text} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.9,
        padding: 15,
        borderColor: colors.dimWhite,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
    },
    cardTitle: {
        flex: 1,
        marginLeft: 15,
        color: colors.text,
        fontSize: 16,
    }
});

export default SettingItem;