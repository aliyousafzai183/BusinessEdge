import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, TextInput } from 'react-native';
import colors from '../utils/colors';
import Header from '../components/Header';
import SettingItem from '../components/SettingItem';
import RouteName from '../routes/RouteName';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteDocumentAndUser } from '../db/deactivate';
import { deleteUserSubcollections } from '../db/ResetApp';
const { width, height } = colors;

const SettingScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await AsyncStorage.removeItem('userId');
                        } catch (e) {
                            // remove error
                        } finally {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [
                                        { name: RouteName.LOGIN_SCREEN }, // Replace with your login screen route name
                                    ],
                                })
                            );
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const clearData = async () => {
        setLoading(true);
        Alert.alert(
            "Confirm Reset App?",
            "Are you sure you want to clear all data?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Clear",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await deleteUserSubcollections();
                            navigation.navigate(RouteName.HOME_SCREEN);
                        } catch (e) {
                            // remove error
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
        setLoading(false);
    };

    const deactivateAccount = async () => {
        Alert.alert(
            "Deactivate Account ?",
            "Are you sure that you want to deactivate your account.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Deactivate",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await deleteDocumentAndUser();
                            logout();
                        } catch (e) {
                            // Handle the error
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
        setLoading(false);
    };

    const privacyPolicies = () => {
        // Open privacy policies page
    };

    const termsAndConditions = () => {
        // Open terms and conditions page
    };

    const contactOwner = () => {
        // Open contact owner page
    };

    const rateUs = () => {
        // Open contact owner page
    };

    return (
        <View style={styles.container1}>
            <Header title="Settings" />
            {
                loading ?
                    <View style={styles.container2}>
                        <ActivityIndicator color={colors.text} size={'large'} />
                    </View>
                    :
                    <View style={styles.container2}>
                        <SettingItem title="Reset App" iconName="trash" onPress={clearData} />
                        <SettingItem title="Rate Us" iconName="star" onPress={rateUs} />
                        <SettingItem title="Privacy Policies" iconName="shield" onPress={privacyPolicies} />
                        <SettingItem title="Contact Owner" iconName="envelope" onPress={contactOwner} />
                        <SettingItem title="Terms and Conditions" iconName="file-text" onPress={termsAndConditions} />
                        <SettingItem title="Logout" iconName="sign-out" onPress={logout} />
                        <SettingItem title="Deactivate Account" iconName="user-times" onPress={deactivateAccount} />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    container2: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 20,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.02
    },
});

export default SettingScreen;
