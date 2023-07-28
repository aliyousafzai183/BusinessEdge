import { collection, doc, addDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './config';

const USERS_COLLECTION = 'users';
const REPORTS_SUBCOLLECTION = 'reports';

const getReportsDbRef = async () => {
    const userId = await AsyncStorage.getItem('userId');
    return collection(db, USERS_COLLECTION, userId, REPORTS_SUBCOLLECTION);
};

export const addReport = async (price, comments, status, date) => {
    const reportData = {
        price,
        comments,
        status,
        date,
    };

    const reportsDbRef = await getReportsDbRef();
    return addDoc(reportsDbRef, reportData);
};

export const getReports = () => {
    return new Promise((resolve, reject) => {
        getReportsDbRef().then(reportsDbRef => {
            const unsubscribe = onSnapshot(reportsDbRef, (querySnapshot) => {
                const reports = [];
                querySnapshot.forEach((documentSnapshot) => {
                    reports.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                resolve({ reports, unsubscribe }); // Resolve the promise with the reports data and unsubscribe function
            }, error => reject(error)); // Reject the promise if there's an error
        });
    });
};




export const deleteReport = async (reportId) => {
    const reportsDbRef = await getReportsDbRef();
    return deleteDoc(doc(reportsDbRef, reportId));
};
