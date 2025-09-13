import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { X, Check } from 'lucide-react-native';

const CITIES = [
  'Abu Dhabi',
  'Ajman', 
  'Al Ain',
  'Dubai',
  'Fujairah',
  'Ras al Khaimah',
  'Sharjah',
  'Umm al Quwain'
];

export default function SellLocationScreen() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string>('Dubai');

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    // Small delay to show selection before navigating
    setTimeout(() => {
      router.push({
        pathname: '/sell/category',
        params: { location }
      });
    }, 150);
  };

  const renderLocationItem = ({ item, index }: { item: string; index: number }) => (
    <>
      <TouchableOpacity
        style={styles.locationItem}
        onPress={() => handleLocationSelect(item)}
        activeOpacity={0.6}
      >
        <Text style={styles.locationText}>{item}</Text>
        {selectedLocation === item && (
          <Check size={20} color={Colors.danger} strokeWidth={2.5} />
        )}
      </TouchableOpacity>
      {index < CITIES.length - 1 && <View style={styles.separator} />}
    </>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
            activeOpacity={0.6}
          >
            <X size={24} color={Colors.gray600} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Select a City</Text>
          <Text style={styles.subtitle}>Where should we place your ad?</Text>
        </View>

        {/* Cities List */}
        <View style={styles.listContainer}>
          <FlatList
            data={CITIES}
            renderItem={renderLocationItem}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            bounces={false}
          />
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 4,
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray500,
    fontWeight: '400',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  locationText: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.gray900,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray200,
    marginHorizontal: 0,
  },
});