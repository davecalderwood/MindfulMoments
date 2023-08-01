import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExercisesContext } from '../store/exercises-context';
import ExerciseForm from '../components/ManageExercise/ExerciseForm';
import { deleteExercise, storeExercise, updateExercise } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function ManageExercise({ route, navigation }) {
    const exercisesContext = useContext(ExercisesContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const editedExerciseID = route.params?.exerciseID;
    const isEditing = !!editedExerciseID;

    const selectedExercise = exercisesContext.exercises.find(i => i.id === editedExerciseID)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Exercise" : "Add Exercise"
        });
    }, [navigation, isEditing]);

    async function deleteExerciseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExercise(editedExerciseID);
            exercisesContext.deleteExercise(editedExerciseID);
            navigation.goBack();
        } catch (error) {
            setError("Could not delete expense.")
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(exerciseData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                exercisesContext.updateExercise(editedExerciseID, exerciseData);
                await updateExercise(editedExerciseID, exerciseData);
            } else {
                const id = await storeExercise(exerciseData);
                exercisesContext.addExercise({ ...exerciseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("Could not save data.");
            setIsSubmitting(false);
        }
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <ExerciseForm
                onCancel={cancelHandler}
                submitButtonLabel={isEditing ? "Update" : "ADD"}
                onSubmit={confirmHandler}
                defaultValues={selectedExercise}
            />
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExerciseHandler}
                    />
                </View>
            }
        </View>
    )
}

export default ManageExercise;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTop: 2,
        borderBottomColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})