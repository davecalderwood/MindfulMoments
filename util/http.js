import axios from "axios";

const BACKEND_URL = 'https://mindfulmoments-12f08-default-rtdb.firebaseio.com'

export async function storeExercise(expenseData) {
    const response = await axios.post(
        BACKEND_URL + '/exercises.json',
        expenseData
    );
    const id = response.data.name; // firebase auto generated id
    return id;
}

export async function fetchExercises() {
    const response = await axios.get(BACKEND_URL + '/exercises.json');

    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            title: response.data[key].title,
            duration: response.data[key].duration,
            difficultyLevel: response.data[key].difficultyLevel,
            description: response.data[key].description,
            tags: response.data[key].tags,
            date: new Date(response.data[key].date)
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export function updateExercise(id, exerciseData) {
    return axios.put(BACKEND_URL + `/exercises/${id}.json`, exerciseData);
}

export function deleteExercise(id) {
    return axios.delete(BACKEND_URL + `/exercises/${id}.json`);
}