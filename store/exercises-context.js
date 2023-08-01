import { createContext, useMemo, useReducer } from "react";

export const ExercisesContext = createContext({
    exercises: [],
    addExercise: ({
        title,
        duration,
        difficultyLevel,
        description,
        tags,
        date
    }) => { },
    setExercises: (exercises) => { },
    deleteExercise: (id) => { },
    updateExercise: (id, {
        title,
        duration,
        difficultyLevel,
        description,
        tags,
        date
    }) => { },
});

function exerciseReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            const inverted = action.payload.reverse();
            return inverted;
        case "UPDATE":
            const updatableExerciseIndex = state.findIndex((exercise) => exercise.id === action.payload.id);
            const updatableExercise = state[updatableExerciseIndex];
            const updatedItem = { ...updatableExercise, ...action.payload.data }
            const updatedExercises = [...state];
            updatedExercises[updatableExerciseIndex] = updatedItem;
            return updatedExercises;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload)
        default:
            break;
    }
}

function ExercisesContextProvider({ children }) {
    const [exercisesState, dispatch] = useReducer(exerciseReducer, []);

    function addExercise(exerciseData) {
        dispatch({ type: "ADD", payload: exerciseData });
    }

    function setExercises(exercises) {
        dispatch({ type: "SET", payload: exercises })
    }

    function deleteExercise(id) {
        dispatch({ type: "DELETE", payload: id });
    }

    function updateExercise(id, exerciseData) {
        dispatch(({ type: "UPDATE", payload: { id: id, data: exerciseData } }));
    }

    const value = useMemo(
        () => ({
            exercises: exercisesState,
            addExercise: addExercise,
            setExercises: setExercises,
            deleteExercise: deleteExercise,
            updateExercise: updateExercise,
        }),
        [exercisesState]
    );

    return <ExercisesContext.Provider value={value}>{children}</ExercisesContext.Provider>
}

export default ExercisesContextProvider;