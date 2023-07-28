import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './config';

const USERS_COLLECTION = 'users';
const REPORTS_SUBCOLLECTION = 'contacts';

const getReportsDbRef = async () => {
    const userId = await AsyncStorage.getItem('userId');
    return collection(db, USERS_COLLECTION, userId, REPORTS_SUBCOLLECTION);
};

export const addContact = async (name, number) => {
    const reportData = {
        name,
        number
    };

    const reportsDbRef = await getReportsDbRef();
    return addDoc(reportsDbRef, reportData);
};

export const getContacts = (callback) => {
    getReportsDbRef().then(reportsDbRef => {
        const unsubscribe = onSnapshot(reportsDbRef, (querySnapshot) => {
            const reports = [];
            querySnapshot.forEach((documentSnapshot) => {
                reports.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                });
            });
            console.log(reports);
            callback(reports); // Call the callback with the reports data
            return unsubscribe; // Return the unsubscribe function
        });
    });
};

export const deleteContact = async (reportId) => {
    const reportsDbRef = await getReportsDbRef();
    return deleteDoc(doc(reportsDbRef, reportId));
};

export const editContact = async (contactId, newName, newNumber) => {
    const reportsDbRef = await getReportsDbRef();
    const contactRef = doc(reportsDbRef, contactId);

    return updateDoc(contactRef, {
        name: newName,
        number: newNumber
    });
};