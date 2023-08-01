import ExercisesOutput from '../components/ExercisesOutput/ExercisesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExercisesContext } from '../store/exercises-context';
import { GetDateMinusDays } from '../util/date';
import { fetchExercises } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExercises() {
    const exercisesContext = useContext(ExercisesContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function getExercises() {
            setIsFetching(true);
            try {
                const exercises = await fetchExercises();
                exercisesContext.setExercises(exercises);
            } catch (error) {
                setError("Could not fetch data.")
            }
            setIsFetching(false);
        }
        getExercises();
    }, []);

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExercises = exercisesContext.exercises.filter(i => {
        const today = new Date();
        const daysSevenDaysAgo = GetDateMinusDays(today, 7);
        return (i.date >= daysSevenDaysAgo) && (i.date <= today);
    });

    return (
        <ExercisesOutput exercises={recentExercises} exercisesPeriod="Last 7 Days" fallbackText={"No exercises for the last 7 days."} />
    )
}

export default RecentExercises;