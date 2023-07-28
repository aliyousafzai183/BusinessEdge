import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import colors from '../utils/colors';

const Header = ({ title, onAddPressed }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        onAddPressed();
    }

    const getRightIcon = () => {
        switch (title) {
            case 'Settings':
                return 'gear';
            case 'Profit & Loss Report':
            case 'Business Todo':
            case 'Business Contacts':
                return 'plus-square-o';
            default:
                return null;
        }
    };

    const rightIcon = getRightIcon();

    return (
        <View style={styles.headerContainer}>
            <StatusBar backgroundColor={colors.primary} hidden={false} barStyle={'light-content'} />

            {
                !rightIcon && (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={styles.icon.size} color={styles.icon.color} />
                    </TouchableOpacity>
                )
            }
            <Text style={styles.title}>{title}</Text>
            {rightIcon &&
                <TouchableOpacity onPress={handlePress}>
                    <Icon name={rightIcon} size={styles.icon.size} color={styles.icon.color} />
                </TouchableOpacity>
            }
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.primary
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: colors.text
    },
    icon: {
        size: 35,
        color: colors.text,
        alignSelf: 'flex-end'
    }
});
