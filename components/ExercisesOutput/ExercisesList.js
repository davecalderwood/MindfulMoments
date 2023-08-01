import { FlatList } from 'react-native';
import ExerciseItem from './ExerciseItem';

function renderExerciseItem(itemData) {
    return <ExerciseItem {...itemData.item} />
}

function ExercisesList({ exercises }) {
    return <FlatList data={exercises} renderItem={renderExerciseItem} keyExtractor={(item) => item.id} />
}

export default ExercisesList;