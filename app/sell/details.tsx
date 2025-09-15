import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function SellDetailsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();

  // Handle navigation based on category
  React.useEffect(() => {
    if (category === 'motors') {
      router.replace('/sell/motors/form');
    }
  }, [category, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Item Details</Text>
        <Text style={styles.subtitle}>Category: {category}</Text>
        <Text style={styles.description}>
          {category === 'motors' 
            ? 'Redirecting to Motors form...' 
            : 'This category form is coming soon in the next step of development.'
          }
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
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
  subtitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
});