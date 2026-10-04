import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../constants/Theme';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Circular SI</Text>
      <Text style={styles.subtitle}>AI-powered shopping and service marketplace</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.bg,
  },
  title: {
    fontSize: Theme.sizes.h1,
    fontFamily: Theme.fonts.text700,
    color: Theme.colors.text1,
  },
  subtitle: {
    marginTop: 8,
    fontSize: Theme.sizes.md,
    color: Theme.colors.text2,
    fontFamily: Theme.fonts.text400,
  },
});
