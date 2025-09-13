import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Car, Briefcase, Chrome as Home, Building, Package, ChevronRight } from 'lucide-react-native';

const CATEGORIES = [
  {
    id: 'motors',
    name: 'Motors',
    icon: Car,
    color: Colors.danger,
    description: 'Cars, motorcycles, and auto parts'
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: Briefcase,
    color: Colors.success,
    description: 'Employment opportunities'
  },
  {
    id: 'property-sale',
    name: 'Property for Sale',
    icon: Home,
    color: Colors.primary,
    description: 'Residential and commercial properties'
  },
  {
    id: 'property-rent',
    name: 'Property for Rent',
    icon: Building,
    color: Colors.secondary,
    description: 'Rental properties and spaces'
  },
  {
    id: 'classifieds',
    name: 'All Classifieds',
    icon: Package,
    color: Colors.accent,
    description: 'Electronics, furniture, and more'
  },
];

export default function SellCategoryScreen() {
  const router = useRouter();
  const { location } = useLocalSearchParams();

  const handleCategorySelect = (categoryId: string) => {
    router.push({
      pathname: `/sell/${categoryId}`,
      params: { location }
    });
  };

  const renderCategoryItem = ({ item }: { item: typeof CATEGORIES[0] }) => {
    const Icon = item.icon;
    
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => handleCategorySelect(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.categoryContent}>
          <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
            <Icon size={28} color={Colors.white} strokeWidth={2} />
          </View>
          <View style={styles.categoryText}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryDescription}>{item.description}</Text>
          </View>
        </View>
        <ChevronRight size={20} color={Colors.textSecondary} strokeWidth={2} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hello, what are you listing today?</Text>
        <Text style={styles.headerSubtitle}>Choose the category that best fits your item</Text>
        {location && (
          <View style={styles.locationBadge}>
            <Text style={styles.locationText}>📍 {location}</Text>
          </View>
        )}
      </View>

      <FlatList
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
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
    marginBottom: 16,
  },
  locationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLighter,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  categoryCard: {
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
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryText: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  separator: {
    height: 12,
  },
});