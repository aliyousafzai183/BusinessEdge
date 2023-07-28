import { deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from './config'; // Assuming you have imported the 'auth' object for Firebase Auth
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
const USERS_COLLECTION = 'users';

export const deleteDocumentAndUser = async () => {
    try {
        // Step 2: Delete the user from Firebase Auth
        await auth.currentUser.delete();
        console.log('User deleted from Firebase Auth successfully');

        const userId = await AsyncStorage.getItem('userId');
        // Step 1: Delete the document from the collection
        await deleteDoc(doc(db, USERS_COLLECTION, userId));
        console.log('Document deleted from Firestore successfully');

    } catch (error) {
        console.error('Error deleting document or user:', error);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
};
