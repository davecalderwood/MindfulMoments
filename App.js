import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExercise from './screens/ManageExercise';
import RecentExercises from './screens/RecentExercises';
import AllExercises from './screens/AllExercises';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExercisesContextProvider from './store/exercises-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExercisesOverview() {
  return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({ tintColor }) => (
      <IconButton
        icon="add"
        size={24}
        color={tintColor}
        onPress={() => {
          navigation.navigate('ManageExercise');
        }}
      />
    ),
  })}>
    <BottomTabs.Screen
      name="AllExercises"
      component={AllExercises}
      options={{
        title: 'All Exercises',
        tabBarLabel: 'All Exercises',
        // tabBarIcon: ({ color, size }) => (
        //   <Ionicons name="calendar" size={size} color={color} />
        // ),
      }}
    />
    <BottomTabs.Screen
      name="RecentExercises"
      component={RecentExercises}
      options={{
        title: 'Recent Exercises',
        tabBarLabel: 'Recent Exercises',
        // tabBarIcon: ({ color, size }) => (
        //   <Ionicons name="hourglass" size={size} color={color} />
        // ),
      }}
    />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExercisesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}>
            <Stack.Screen
              name="ExercisesOverview"
              component={ExercisesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ManageExercise" component={ManageExercise} options={{
              presentation: 'modal'
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExercisesContextProvider>
    </>
  );
}

