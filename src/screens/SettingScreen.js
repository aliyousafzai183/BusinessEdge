import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../utils/colors';
import Header from '../components/Header';
import SettingItem from '../components/SettingItem';
import RouteName from '../routes/RouteName';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = colors;

const SettingScreen = ({ navigation }) => {
    const logout = async () => {
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
        }
    };

    const clearData = () => {
        // Your clear data logic here
    };

    const deactivateAccount = () => {
        // Your deactivate account logic here
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
            <View style={styles.container2}>
                <SettingItem title="Reset App" iconName="trash" onPress={clearData} />
                <SettingItem title="Rate Us" iconName="star" onPress={rateUs} />
                <SettingItem title="Privacy Policies" iconName="shield" onPress={privacyPolicies} />
                <SettingItem title="Contact Owner" iconName="envelope" onPress={contactOwner} />
                <SettingItem title="Terms and Conditions" iconName="file-text" onPress={termsAndConditions} />
                <SettingItem title="Logout" iconName="sign-out" onPress={logout} />
                <SettingItem title="Deactivate Account" iconName="user-times" onPress={deactivateAccount} />
            </View>
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
