import { Text } from 'react-native';
import ExercisesOutput from '../components/ExercisesOutput/ExercisesOutput';
import { useContext } from 'react';
import { ExercisesContext } from '../store/exercises-context';

function AllExercises() {
    const exercisesContext = useContext(ExercisesContext);
    return (
        <ExercisesOutput exercises={exercisesContext.exercises} exercisesPeriod="Total" fallbackText={"No exercises available."} />
    )
}

export default AllExercises;