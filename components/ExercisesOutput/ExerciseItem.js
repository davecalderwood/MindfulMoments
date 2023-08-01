import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function ExerciseItem({ id, title, duration, description, difficultyLevel }) {
    const navigation = useNavigation();

    let difficultyColor;

    switch (difficultyLevel?.toLowerCase()) {
        case 'beginner':
            difficultyColor = GlobalStyles.colors.easy;
            break;
        case 'intermediate':
            difficultyColor = GlobalStyles.colors.medium;
            break;
        case 'hard':
            difficultyColor = GlobalStyles.colors.hard;
            break;
        default:
            difficultyColor = GlobalStyles.colors.primary50;
    }

    function exercisePressHandler() {
        navigation.navigate('ManageExercise', {
            exerciseID: id
        });
    }

    return (
        <Pressable onPress={exercisePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.exerciseItem}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.textBase, styles.title]} numberOfLines={1} ellipsizeMode="tail">
                        {title}
                    </Text>
                    <Text style={[styles.textBase, styles.duration]}>{duration}</Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.textBase}>{description}</Text>
                    <Text style={[styles.textBase, styles.difficulty, { color: difficultyColor }]}>{difficultyLevel}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    exerciseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    title: {
        flex: 1,
        fontSize: 16,
        marginBottom: 4,
        marginRight: 10,
        fontWeight: "bold",
    },
    duration: {
        fontSize: 12,
    },
    descriptionContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    difficulty: {
        fontWeight: "bold",
        marginTop: 8,
    },
});

export default ExerciseItem;
