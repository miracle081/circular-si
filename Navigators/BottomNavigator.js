import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { AppContext } from '../utils/globalVariables';
import { useContext, useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    const { modeColors } = useContext(AppContext);
    const insets = useSafeAreaInsets();
    const bottomInset = Platform.OS === 'android' ? insets.bottom : Math.max(6, insets.bottom);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        setIsSignedIn(true);
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: modeColors.text1,
                tabBarStyle: {
                    backgroundColor: modeColors.bg2,
                    borderTopColor: modeColors.line,
                    height: 64 + bottomInset,
                    paddingBottom: Math.max(8, bottomInset),
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home-outline';
                    let IconComponent = Ionicons;
                    if (route.name === 'Main') {
                        IconComponent = Feather;
                        iconName = focused ? 'home' : 'home';
                    }
                    if (route.name === 'Orders') {
                        IconComponent = FontAwesome5;
                        iconName = focused ? 'truck' : 'truck-loading';
                    }
                    if (route.name === 'Products') iconName = focused ? 'list' : 'list-outline';
                    if (route.name === 'Shops') iconName = focused ? 'storefront' : 'storefront-outline';
                    if (route.name === 'Services') iconName = focused ? 'construct' : 'construct-outline';
                    if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
                    return <IconComponent name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Main" component={Home} options={{ title: 'Home' }} />
            <Tab.Screen name="Products" component={Products} />
            {isSignedIn ? <Tab.Screen name="Shops" component={Shops} /> : null}
            <Tab.Screen name="Services" component={Services} />
            {isSignedIn ? <Tab.Screen name="Orders" component={Orders} /> : null}
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function Home() {
    return null;
}

function Products() {
    return null;
}

function Shops() {
    return null;
}

function Services() {
    return null;
}

function Orders() {
    return null;
}

function ProfileScreen() {
    return null;
}
