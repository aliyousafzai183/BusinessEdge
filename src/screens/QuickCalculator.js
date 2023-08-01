import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import colors from '../utils/colors';

const { width, height } = Dimensions.get('window');

const buttons = [
    ['AC', '±', '%', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
];

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [previousValue, setPreviousValue] = useState(null);

    const handlePress = (buttonPressed) => {
        if(buttonPressed === '+' || buttonPressed === '-' || buttonPressed === 'x' || buttonPressed === '/'){
            setOperator(buttonPressed);
            setPreviousValue(currentValue);
            setCurrentValue('0');
        } else if(buttonPressed === '='){
            const current = parseFloat(currentValue);
            const previous = parseFloat(previousValue);

            if (operator === '+'){
                setCurrentValue((previous + current).toString());
            } else if (operator === '-'){
                setCurrentValue((previous - current).toString());
            } else if (operator === 'x'){
                setCurrentValue((previous * current).toString());
            } else if (operator === '/'){
                setCurrentValue((previous / current).toString());
            }

            setOperator(null);
            setPreviousValue(null);
        } else if(buttonPressed === 'AC'){
            setCurrentValue('0');
            setOperator(null);
            setPreviousValue(null);
        } else if(buttonPressed === '±'){
            setCurrentValue((parseFloat(currentValue) * -1).toString());
        } else if(buttonPressed === '%'){
            setCurrentValue((parseFloat(currentValue) * 0.01).toString());
        } else if(currentValue[currentValue.length - 1] !== '.' || buttonPressed !== '.'){
            setCurrentValue(currentValue === '0' ? buttonPressed : currentValue + buttonPressed);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.display}>
                <Text style={styles.displayText}>{parseFloat(currentValue).toLocaleString()}</Text>
            </View>
            <View style={styles.buttons}>
                {buttons.map((row, rowIndex) => (
                    <View style={styles.row} key={rowIndex}>
                        {row.map((button, buttonIndex) => (
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    rowIndex === 4 && buttonIndex === 0 && styles.zeroButton
                                ]}
                                onPress={() => handlePress(button)}
                                key={buttonIndex}
                            >
                                <Text style={styles.buttonText}>{button}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    display: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
    },
    displayText: {
        color: colors.text,
        fontSize: 60,
    },
    buttons: {
        // flex: 7,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: width / 4,
        height: height / 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: colors.dimWhite,
    },
    zeroButton: {
        width: (width / 4) * 2,
    },
    buttonText: {
        color: colors.white,
        fontSize: 30,
    },
});

export default Calculator;
