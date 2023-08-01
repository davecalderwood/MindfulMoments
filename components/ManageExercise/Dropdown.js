import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Dropdown({ label, selectedValue, onValueChange, options }) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Picker itemStyle={{ height: 100 }} style={styles.pickerContainer} selectedValue={selectedValue} onValueChange={onValueChange}>
                {options.map((option) => (
                    <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                    />
                ))}
            </Picker>
        </View>
    );
}

export default Dropdown;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 2
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    },
    pickerContainer: {
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 6,
        height: 100,
        overflow: "hidden",
    },
    picker: {
        color: GlobalStyles.colors.primary700,
    },
})
