import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { X, Check } from 'lucide-react-native';
import { EMIRATES } from '@/constants/dummyData';
import { useState } from 'react';

export default function SellLocationScreen() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    router.push({
      pathname: '/sell/category',
      params: { location }
    });
  };

  const renderLocationItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.locationCard}
      onPress={() => handleLocationSelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.locationName}>{item}</Text>
      {selectedLocation === item && (
        <Check size={20} color={Colors.danger} strokeWidth={2} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <X size={24} color={Colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select a City</Text>
          <Text style={styles.subtitle}>Where should we place your ad?</Text>
        </View>

        <FlatList
          data={EMIRATES}
          renderItem={renderLocationItem}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '400',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 0,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },
  locationName: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.textPrimary,
    flex: 1,
  },
  separator: {
    height: 12,
    backgroundColor: Colors.gray200,
    marginLeft: 24,
  },
});