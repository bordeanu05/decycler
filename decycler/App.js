import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from './screens/IntroScreen';
import HomeScreen from './screens/HomeScreen';
import DecideScreen from './screens/DecideScreen';
import LoginAsPerson from './screens/loginScreens/LoginAsPeson';
import RegisterAsCompany from './screens/registerScreens/RegisterAsCompany';
import RegisterAsPerson from './screens/registerScreens/RegisterAsPerson';
import LoginAsCompany from './screens/loginScreens/LoginAsCompany';
import UserScreen from './screens/HomeScreens/UserScreen';
import AddNewPostScreen from './screens/AddNewPostScreen';
import UserPostScreen from './screens/PostScreens/UserPostScreen';
import ProfileScreen from './screens/ProfileScreen';
import CompanyScreen from './screens/HomeScreens/CompanyScreen';
import CompanyPostScreen from './screens/PostScreens/CompanyPostScreen';
import AddInfoPost from './screens/AddInfoPost';
import ProfileScreenCompany from './screens/ProfileScreenCompany';

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator > 
              <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="UserPage" options={{headerShown: false}} component={UserScreen} />
 
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Decide" options={{headerShown: false}} component={DecideScreen} />
        <Stack.Screen name="LoginAsComp" options={{headerShown: false}} component={LoginAsCompany} />
        <Stack.Screen name="LoginAsPers" options={{headerShown: false}} component={LoginAsPerson} />
        <Stack.Screen name="Register as buyer" options={{headerShown: false}} component={RegisterAsCompany} />
        <Stack.Screen name="Register as seller" options={{headerShown: false}} component={RegisterAsPerson} />
        <Stack.Screen name="AddNewPost" options={{headerShown: false}} component={AddNewPostScreen} />
        <Stack.Screen name="UserPost" options={{headerShown: false}}component={UserPostScreen} />
        <Stack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
        <Stack.Screen name="CompanyPage" options={{headerShown: false}} component={CompanyScreen} />
        <Stack.Screen name="CompanyPost" options={{headerShown: false}} component={CompanyPostScreen} />
        <Stack.Screen name="AddInfo" options={{headerShown: false}} component={AddInfoPost} />
        <Stack.Screen name="ProfileCompany" options={{headerShown: false}} component={ProfileScreenCompany} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}