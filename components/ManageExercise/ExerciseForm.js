import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from "./Input";
import Dropdown from "./Dropdown";
import Button from '../UI/Button';
import { GlobalStyles } from '../../constants/styles';

function ExerciseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const difficultyOptions = [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Hard', value: 'Hard' },
    ];
    const durationOptions = [
        { label: '5 Minutes', value: '5 Minutes' },
        { label: '10 Minutes', value: '10 Minutes' },
        { label: '15 Minutes', value: '15 Minutes' },
        { label: '20 Minutes', value: '20 Minutes' },
        { label: '25 Minutes', value: '25 Minutes' },
        { label: '30 Minutes', value: '30 Minutes' },
        { label: '45 Minutes', value: '45 Minutes' },
        { label: '60 Minutes', value: '60 Minutes' },
    ];

    const [inputs, setInputs] = useState({
        title: {
            value: defaultValues ? defaultValues.title : '',
            isValid: true,
        },
        duration: {
            value: defaultValues ? defaultValues.duration : durationOptions[0]?.value,
            isValid: true,
        },
        difficultyLevel: {
            value: defaultValues ? defaultValues.difficultyLevel : difficultyOptions[0]?.value,
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
        tags: {
            value: defaultValues ? defaultValues.tags : '',
            isValid: true,
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputValues) => {
            const updatedValues = {
                ...currentInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
            return updatedValues;
        });
    }

    function submitHandler() {
        const exerciseData = {
            title: inputs.title.value,
            duration: inputs.duration.value,
            difficultyLevel: inputs.difficultyLevel.value,
            description: inputs.description.value,
            tags: inputs.tags.value,
            date: new Date(),
        };

        // Form validation
        const titleIsValid = exerciseData.title.trim().length > 0;
        const descriptionIsValid = exerciseData.description.trim().length > 0;

        if (!titleIsValid || !descriptionIsValid) {
            // Alert.alert("Invalid input", "Please check your input values");
            setInputs((currentInputs) => {
                return {
                    title: { value: currentInputs.title.value, isValid: titleIsValid },
                    duration: { value: currentInputs.duration.value, isValid: true },
                    difficultyLevel: { value: currentInputs.difficultyLevel.value, isValid: true },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid },
                    tags: { value: currentInputs.tags.value, isValid: true },
                };
            });

            return;
        }

        onSubmit(exerciseData);
    }

    const formIsInvalid = !inputs.title.isValid || !inputs.description.isValid;

    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Input
                        label="Title"
                        invalid={!inputs.title.isValid}
                        textInputConfig={{
                            placeholder: "Enter the title of the exercise",
                            maxLength: 30,
                            onChangeText: inputChangedHandler.bind(this, 'title'),
                            value: inputs.title.value,
                        }}
                    />

                    <Dropdown
                        label="Duration"
                        selectedValue={inputs.duration.value}
                        onValueChange={inputChangedHandler.bind(this, 'duration')}
                        options={durationOptions}
                    />

                    <Dropdown
                        label="Difficulty"
                        selectedValue={inputs.difficultyLevel.value}
                        onValueChange={inputChangedHandler.bind(this, 'difficultyLevel')}
                        options={difficultyOptions}
                    />

                    <Input
                        label="Description"
                        invalid={!inputs.description.isValid}
                        textInputConfig={{
                            placeholder: "Enter the description of the exercise",
                            multiLine: true,
                            onChangeText: inputChangedHandler.bind(this, 'description'),
                            value: inputs.description.value,
                        }}
                    />

                    <Input
                        label="Tags"
                        textInputConfig={{
                            placeholder: "Enter tags to help identify this workout",
                            onChangeText: inputChangedHandler.bind(this, 'tags'),
                            value: inputs.tags.value,
                        }}
                    />

                    {formIsInvalid && <Text style={styles.errorText}>Invalid input values, please check your entered data.</Text>}

                    <View style={styles.buttonContainer}>
                        <Button mode="flat" onPress={onCancel} style={styles.button}>
                            Cancel
                        </Button>
                        <Button onPress={submitHandler} style={styles.button}>
                            {submitButtonLabel}
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
}

export default ExerciseForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
});
