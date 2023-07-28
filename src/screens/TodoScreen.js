import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Modal, TouchableOpacity, Text, Pressable } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import colors from '../utils/colors';
import Header from '../components/Header';
import TodoItem from '../components/TodoItem';

const TodoScreen = () => {
    const [todos, setTodos] = useState([
        { text: 'Learn React Native', completed: false },
        { text: 'Workout', completed: false },
        { text: 'Finish project', completed: true },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const [todoError, setTodoError] = useState(null);
    const inputRef = useRef(null);

    const handleAddTodo = () => {
        if (newTodo === '') {
            setTodoError('Todo cannot be empty');
            inputRef.current.shake();
            return;
        }
        setTodos([...todos, { text: newTodo, completed: false }]);
        setModalVisible(false);
        setNewTodo('');
        setTodoError(null);
    };

    const handleCheckTodo = (index) => {
        let newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    return (
        <View style={styles.container1}>
            <Header title="Business Todo" onAddPressed={() => setModalVisible(true)} />

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
                                ref={inputRef}
                                leftIcon={<Icon name="list" size={24} color={colors.white} />}
                                errorMessage={todoError}
                                errorStyle={{ color: 'red' }}
                                placeholder="Meeting on next day.."
                                value={newTodo}
                                onChangeText={setNewTodo}
                                placeholderTextColor={colors.dimWhite}
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                                <Text style={styles.addButtonText}>Add Todo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => { setModalVisible(false) }}>
                                <Icon name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>

                <FlatList
                    data={todos}
                    renderItem={({ item, index }) =>
                        <TodoItem
                            item={item}
                            onItemPress={() => handleCheckTodo(index)}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
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
        borderRadius: 20
    },
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderColor: colors.text,
        borderWidth: 1,
    },
    todoText: {
        marginLeft: 10,
        fontSize: 16,
        color: colors.text
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
        height: '30%'
    },
    addButton: {
        width: '80%',
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
    }
});

export default TodoScreen;