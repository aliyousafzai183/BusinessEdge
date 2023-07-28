import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import colors from '../utils/colors';
import Header from '../components/Header';
import ContactItem from '../components/ContactItem';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { addContact, getContacts, deleteContact, editContact } from '../db/contactsDb';

const ContactScreen = () => {
    const [contacts, setContacts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', number: '' });
    const [contactError, setContactError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const nameInputRef = useRef(null); // reference for the name input
    const numberInputRef = useRef(null); // reference for the number input
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    const handleAddContact = async () => {
        setAdding(true);
        let hasError = false;
        if (newContact.name.trim().length === 0 && newContact.name.trim().length < 15) {
            setNameError('Contact name should be between 5 and 20 characters.');
            nameInputRef.current.shake();
            hasError = true;
        } else {
            setNameError("");
        }

        if (newContact.number.length < 5 || newContact.number.length > 20) {
            setContactError('Contact number should be between 5 and 20 characters.');
            numberInputRef.current.shake();
            hasError = true;
        } else {
            setContactError("");
        }

        if (!hasError) {
            await addContact(newContact.name, newContact.number);
            setNewContact({ name: '', number: '' });
            setModalVisible(false);
        }
        setAdding(false);
    };

    const handleDeleteContact = async (index) => {
        await deleteContact(contacts[index].id);
    };

    useEffect(() => {
        const unsubscribe = getContacts((reports) => {
            setContacts(reports || []);
            setLoading(false);
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container1}>
            <Header title="Business Contacts" onAddPressed={() => setModalVisible(true)} />
            <View style={styles.container2}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Pressable
                        style={styles.modalContainer}
                        onPress={() => { setModalVisible(false) }}
                    >
                        <View style={styles.modalView}>
                            <Input
                                ref={nameInputRef}
                                placeholder="Contact Name"
                                value={newContact.name}
                                onChangeText={name => setNewContact({ ...newContact, name })}
                                errorMessage={nameError}
                                style={styles.input}
                            />
                            <Input
                                ref={numberInputRef}
                                placeholder="Contact Number"
                                value={newContact.number}
                                onChangeText={number => setNewContact({ ...newContact, number })}
                                errorMessage={contactError}
                                keyboardType="phone-pad"
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
                                {
                                    adding ?
                                        <ActivityIndicator color={colors.text} size={'small'} />
                                        :
                                        <Text style={styles.addButtonText}>Add Contact</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => { setModalVisible(false) }}>
                                <Icon name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>

                {
                    contacts.length > 0 ?
                        <FlatList
                            data={contacts}
                            renderItem={({ item, index }) =>
                                <ContactItem
                                    item={item}
                                    onEdit={() => handleEditContact(index)}
                                    onDelete={() => handleDeleteContact(index)}
                                />}
                            keyExtractor={(item, index) => index.toString()}
                        /> :
                        <View style={styles.noContactsContainer}>
                            <Icon2 name="address-book-o" size={24} color={colors.dimWhite} />
                            <Text style={styles.noContactsText}>No Contacts Found!</Text>
                        </View>
                }


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    container2: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.dimBlack
    },
    modalView: {
        backgroundColor: colors.background,
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '40%'
    },

    addButton: {
        width: '100%',
        height: 40,
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        position: 'absolute',
        top: '10%',
        right: '5%'
    },
    addButtonText: {
        color: colors.text,
        fontSize: 16,
    },
    input: {
        color: colors.text
    },
    noContactsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noContactsText: {
        marginTop: 10,
        fontSize: 20,
        color: colors.dimWhite,
    },

});

export default ContactScreen;
