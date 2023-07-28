import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';
import { deleteReport } from '../db/reportsDb';

const ReportItem = ({ item, onDelete }) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.iconBox(item?.status)}>
                <Icon name={item.status === 'Received' ? "arrow-down" : "arrow-up"} size={20} color={colors.white} />
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.costText}>{item?.price}$</Text>
                {
                    item.comments && (
                        <Text style={styles.titleText}>{item.comments}</Text>
                    )
                }
            </View>
            <TouchableOpacity style={styles.deleteIcon} onPress={() => onDelete(item.id)} >
                <Icon name="trash" size={20} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.dateText}>{item?.date}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.dimWhite
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center'
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
    deleteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default ReportItem;
