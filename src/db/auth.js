import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore"; // Import Firestore modules
import RouteName from "../routes/RouteName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { auth, db } from './config';
import { ToastAndroid } from "react-native";


export const SignUp = (email, password, navigation, setActivity) => {
    setActivity(true);
    if (password === "" || password.length < 6) {
        ShowToast("Password should be at least 6 characters long.");
        console.log("Wrong Password");
        setActivity(false);
        return;
    }

    if (!validateEmail(email)) {
        console.log("Wrong Email");
        ShowToast("Please enter a valid email address.");
        setActivity(false);
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            const userId = user.uid;
            saveUserIdToAsyncStorage(userId); // Save the userId to AsyncStorage

            // Create a document in the "users" collection with default fields
            const userRef = doc(db, "users", userId);
            setDoc(userRef, {
                email: email
            })
                .then(() => {
                    // console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

            navigation.dispatch(
                CommonActions.reset({
                    index: 0, // This is the index of the screen that you want to reset to (MAINHomeScreen)
                    routes: [
                        { name: RouteName.BOTTOM_TAB }, // Replace RouteName.MAIN_HOME_SCREEN with the actual name of your MAINHomeScreen route
                    ],
                })
            );
        })
        .catch((error) => {
            const errorMessage = error.message;
            ShowToast(errorMessage);
            console.log(errorMessage);
        })
        .finally(() => {
            setActivity(false);
        })
};

export const SignIn = (email, password, navigation, setActivity) => {
    setActivity(true);
    if (password === "" || password.length < 6) {
        ShowToast("Password should be at least 6 characters long.");
        console.log("Wrong Pass");
        setActivity(false);
        return;
    }

    if (!validateEmail(email)) {
        ShowToast("Please enter a valid email address.");
        console.log("Wrong Email");
        setActivity(false);
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            const userId = user.uid;
            saveUserIdToAsyncStorage(userId); // Save the userId to AsyncStorage
            navigation.dispatch(
                CommonActions.reset({
                    index: 0, // This is the index of the screen that you want to reset to (MAINHomeScreen)
                    routes: [
                        { name: RouteName.BOTTOM_TAB }, // Replace RouteName.MAIN_HOME_SCREEN with the actual name of your MAINHomeScreen route
                    ],
                })
            );
        })
        .catch((error) => {
            const errorMessage = error.message;
            ShowToast(errorMessage);
            console.log(errorMessage);

        })
        .finally(() => {
            setActivity(false);
        })
};

const ShowToast = (message) => {
    ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
}

const saveUserIdToAsyncStorage = (userId) => {
    // Save the userId to AsyncStorage
    AsyncStorage.setItem("userId", userId)
        .then(() => {
            // console.log("User ID saved successfully in AsyncStorage:", userId);
        })
        .catch((error) => {
            console.error("Error saving user ID in AsyncStorage:", error);
        });
}

const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
}

// Function to send a password reset email
export const handleForgotPassword = async (email, navigation, setActivity) => {
    setActivity(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            ToastAndroid.show('Password reset Email Sent!', ToastAndroid.SHORT);
            navigation.goBack();
            setActivity(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
            setActivity(false);

        });
};