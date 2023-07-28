import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../utils/colors';

const ContactItem = ({ item, onEdit, onDelete }) => (
    <View style={styles.contactItem}>
        <Text style={styles.contactNumber}>{item.number}</Text>
        <View style={styles.subContainer}>
            {/* <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
                <Icon name="edit" size={24} color={colors.secondary} />
            </TouchableOpacity> */}
            <Text style={styles.contactName}>{item.name}  |  </Text>
            <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
                <Icon name="delete" size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: colors.dimWhite,
        borderRadius: 20,
        justifyContent: 'space-between'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactName: {
        fontSize: 16,
        color: colors.text,
    },
    contactNumber: {
        fontSize: 16,
        color: colors.text,
        textAlign: 'right',
    },
    deleteIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ContactItem;