import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Theme } from '../constants/Theme';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../utils/globalVariables';
import * as SecureStore from 'expo-secure-store';
import { navigationRef } from '../utils/navigationRef';
import HomeScreen from './BottomNavigator';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
    const { setUserInfo, setUserUID, mode, modeColors } = useContext(AppContext);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getToken = async () => {
        try {
            const [storedToken, storedUser] = await Promise.all([
                SecureStore.getItemAsync('access'),
                SecureStore.getItemAsync('user')
            ]);

            if (storedToken) {
                setToken(storedToken);
                if (storedUser) {
                    try {
                        const user = JSON.parse(storedUser);
                        setUserInfo(user);
                        setUserUID(user.id);
                    } catch (parseError) {
                        console.log('Error parsing user data:', parseError);
                        await SecureStore.deleteItemAsync('user');
                    }
                }
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    if (isLoading) return null;

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <ExpoStatusBar animated style={mode === 'dark' ? 'light' : 'dark'} backgroundColor={modeColors.bg} />
            <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    headerShown: false,
                    headerTintColor: modeColors.text1,
                    headerStyle: { backgroundColor: modeColors.bg },
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
