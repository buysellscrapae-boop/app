import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useLocation } from '@/contexts/LocationContext'; // Import useLocation

export default function SellScreen() {
  const { location } = useLocation(); // Use the context, even if not displayed directly

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sell Your Items</Text>
        <Text style={styles.description}>
          This screen is where users can list items for sale.
          When you press the 'Sell' tab, you are redirected to the location selection.
        </Text>
        {location && (
          <Text style={styles.locationText}>Current Location: {location}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
});
