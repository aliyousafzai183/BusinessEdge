import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_COLLECTION = 'users';
const SUBCOLLECTIONS_TO_DELETE = ['contacts', 'reports', 'todos'];

export const deleteUserSubcollections = async () => {
    const userId = await AsyncStorage.getItem('userId');

    for (let subcollection of SUBCOLLECTIONS_TO_DELETE) {
        const subcollectionRef = collection(db, USERS_COLLECTION, userId, subcollection);
        const q = query(subcollectionRef);
        const querySnapshot = await getDocs(q);

        // Delete all documents in the subcollection
        querySnapshot.forEach((documentSnapshot) => {
            deleteDoc(doc(subcollectionRef, documentSnapshot.id));
        });
    }
};
