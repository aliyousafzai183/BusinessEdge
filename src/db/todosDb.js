import { collection, doc, addDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './config';

const USERS_COLLECTION = 'users';
const REPORTS_SUBCOLLECTION = 'todos';

const getReportsDbRef = async () => {
    const userId = await AsyncStorage.getItem('userId');
    return collection(db, USERS_COLLECTION, userId, REPORTS_SUBCOLLECTION);
};

export const addTodos = async (text) => {
    const reportData = {
        text
    };

    const reportsDbRef = await getReportsDbRef();
    return addDoc(reportsDbRef, reportData);
};

export const getTodos = (callback) => {
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

export const deleteTodo = async (reportId) => {
    const reportsDbRef = await getReportsDbRef();
    return deleteDoc(doc(reportsDbRef, reportId));
};
