import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MapPin, ChevronRight } from 'lucide-react-native';
import { EMIRATES } from '@/constants/dummyData';

export default function SellLocationScreen() {
  const router = useRouter();

  const handleLocationSelect = (location: string) => {
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
      <View style={styles.locationContent}>
        <View style={styles.locationIcon}>
          <MapPin size={24} color={Colors.primary} strokeWidth={2} />
        </View>
        <Text style={styles.locationName}>{item}</Text>
      </View>
      <ChevronRight size={20} color={Colors.textSecondary} strokeWidth={2} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Where should we place your ad?</Text>
        <Text style={styles.headerSubtitle}>Select your emirate to get started</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 34,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  separator: {
    height: 12,
  },
});