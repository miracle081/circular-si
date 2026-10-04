import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { RootSiblingParent } from 'react-native-root-siblings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './utils/globalVariables';
import { StackNavigator } from './Navigators/StackNavigator';
import { navigationRef } from './utils/navigationRef';
import { Manrope_200ExtraLight, Manrope_300Light, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold, useFonts } from '@expo-google-fonts/manrope';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from './constants/Theme';

export default function App() {
  const [loaded, error] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  const [authReady, setAuthReady] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (mounted) setIsOffline(!state.isConnected);
    });

    NetInfo.fetch().then((state) => {
      if (mounted) setIsOffline(!state.isConnected);
    });

    setTimeout(() => {
      if (mounted) setAuthReady(true);
    }, 300);

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if ((loaded || error) && authReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, authReady]);

  if (!loaded || !authReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <AppProvider>
          <View style={styles.container}>
            {isOffline ? (
              <View style={styles.offlineBanner}>
                <SafeAreaView>
                  <Text style={[styles.offlineText, { fontSize: Theme.sizes.sm }]}>You’re offline. Please turn on your data connection to continue.</Text>
                </SafeAreaView>
              </View>
            ) : null}
            <StackNavigator ref={navigationRef} />
          </View>
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  offlineBanner: {
    backgroundColor: '#ca3131',
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 20,
  },
  offlineText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
});
