import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, Modal, TouchableOpacity, Platform, Pressable, Text } from 'react-native';
import { Input, Icon2 } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import colors from '../utils/colors';
import Header from '../components/Header';
import ReportItem from '../components/ReportItem';

const { width, height } = colors;

const HomeScreen = () => {
    const [costError, setCostError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [totalProfit, setTotalProfit] = useState(0);
    const [totalLoss, setTotalLoss] = useState(0);
    const costRef = useRef(null);
    const titleRef = useRef(null);
    const [reports, setReports] = useState([
        { status: 'Received', cost: '20$', title: 'Some Title 1', date: '2023-07-15' },
        { status: 'Sent', cost: '30$', title: 'Some Title 2', date: '2023-07-20' },
        { status: 'Received', cost: '10$', title: 'Some Title 3', date: '2023-07-22' },
    ]);

    useEffect(() => {
        const profit = reports.reduce((total, report) => {
            if (report.status === 'Received') {
                return total + parseFloat(report.cost);
            }
            return total;
        }, 0);

        const loss = reports.reduce((total, report) => {
            if (report.status === 'Sent') {
                return total + parseFloat(report.cost);
            }
            return total;
        }, 0);

        setTotalProfit(profit);
        setTotalLoss(loss);
    }, [reports]);


    const [modalVisible, setModalVisible] = useState(false);
    const [newReport, setNewReport] = useState({ status: 'Received', cost: '', title: '', date: new Date() });

    const saveReport = () => {
        let hasError = false;

        // Cost validation
        if (!newReport.cost || newReport.cost > 1000) {
            setCostError("Please enter a valid cost (less than 10000).");
            costRef.current.shake();
            hasError = true;
        } else {
            setCostError("");
        }

        // Title validation
        const words = newReport.title.split(' ');
        if (words.length > 4) {
            setTitleError("Please enter less than 5 words.");
            titleRef.current.shake();
            hasError = true;
        } else {
            setTitleError("");
        }

        if (!hasError) {
            setReports([...reports, newReport]);
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container1}>
            <Header title="Profit & Loss Report" onAddPressed={() => setModalVisible(!modalVisible)} />
            <View style={styles.container2}>
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>Total Profit: ${totalProfit}</Text>
                    </View>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>Total Loss: ${totalLoss}</Text>
                    </View>
                </View>
                <FlatList
                    data={reports}
                    renderItem={({ item }) => <ReportItem item={item} />}
                    keyExtractor={item => item.date}
                    contentContainerStyle={styles.list}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Pressable
                        style={styles.modalContiner}
                        onPress={() => { setModalVisible(false) }}
                    >
                        <View style={styles.modalView}>
                            <Input
                                ref={costRef}
                                leftIcon={<Icon name="dollar" size={24} color={colors.dimWhite} />}
                                onChangeText={cost => setNewReport({ ...newReport, cost })}
                                placeholder="Price"
                                keyboardType="numeric"
                                style={styles.input}
                                errorMessage={costError}
                                errorStyle={{ color: 'red' }}
                            />
                            <Input
                                ref={titleRef}
                                leftIcon={<Icon name="comment" size={24} color={colors.dimWhite} />}
                                onChangeText={title => setNewReport({ ...newReport, title })}
                                placeholder="Comments"
                                style={styles.input}
                                errorMessage={titleError}
                                errorStyle={{ color: 'red' }}
                            />
                            <Picker
                                selectedValue={newReport.status}
                                onValueChange={(itemValue, itemIndex) => setNewReport({ ...newReport, status: itemValue })}
                            >
                                <Picker.Item label="Received" value="Received" />
                                <Picker.Item label="Sent" value="Sent" />
                            </Picker>
                            {Platform.OS === 'ios' && <DateTimePicker
                                value={newReport.date}
                                mode={'date'}
                                display="default"
                                onChange={(event, selectedDate) => setNewReport({ ...newReport, date: selectedDate })}
                            />}
                            <TouchableOpacity style={styles.addButton} onPress={saveReport}>
                                <Text style={styles.addButtonText}>Add Todo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => { setModalVisible(false) }}>
                                <Icon name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                    </Pressable>
                </Modal>
            </View>
        </View>
    );
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

    modalContiner: {
        flex: 1,
        backgroundColor: colors.dimBlack,
        justifyContent: 'flex-end'
    },
    modalView: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: colors.background,
        padding: 20,
        height: '50%',
        justifyContent: 'space-around',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    summaryBox: {
        padding: 10,
        borderColor: colors.secondary,
        borderRadius: 10,
        width: '45%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    summaryText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        color: colors.text,
    },
    addButton: {
        width: '100%',
        height: 40,
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: colors.text,
        fontSize: 16,
    },
    cancelButton: {
        position: 'absolute',
        top: '5%',
        right: '5%'
    },
});

export default HomeScreen;
