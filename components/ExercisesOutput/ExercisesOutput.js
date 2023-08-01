import { StyleSheet, View, Text } from 'react-native';
import ExercisesSummary from './ExercisesSummary';
import ExercisesList from './ExercisesList';
import { GlobalStyles } from '../../constants/styles';

function ExercisesOutput({ exercises, exercisesPeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (exercises.length > 0) {
        content = <ExercisesList exercises={exercises} />;
    }

    return (
        <View style={styles.container}>
            <ExercisesSummary exercises={exercises} periodName={exercisesPeriod} />
            {content}
        </View>
    )
}

export default ExercisesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
})