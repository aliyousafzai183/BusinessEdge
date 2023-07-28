import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';

const ReportItem = ({ item }) => {
    const dateString = item.date instanceof Date ? item.date.toDateString() : item.date;

    return (
        <Pressable style={styles.itemContainer}>
            <View style={styles.iconBox(item.status)}>
                <Icon name={item.status === 'Received' ? "arrow-down" : "arrow-up"} size={20} color={colors.white} />
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.costText}>{item.cost}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <Text style={styles.dateText}>{dateString}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.dimWhite
    },
    iconBox: status => ({
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: status === 'Received' ? colors.secondary : colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    }),
    detailBox: {
        flex: 1,
    },
    costText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    titleText: {
        color: colors.dimWhite,
        fontSize: 14,
    },
    dateText: {
        color: colors.white,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default ReportItem;
