import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExercisesSummary({ exercises, periodName }) {
    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.count}>{exercises.length}</Text>
        </View>
    )
}

export default ExercisesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    count: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
})