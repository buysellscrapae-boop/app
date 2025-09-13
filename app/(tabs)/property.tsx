import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { RESIDENTIAL_PROPERTIES, COMMERCIAL_PROPERTIES } from '@/constants/dummyData';
import PropertyTypeGrid from '@/components/PropertyTypeGrid';
import PropertySection from '@/components/PropertySection';
import SearchBar from '@/components/SearchBar';
import TabNavigation from '@/components/TabNavigation';

type PropertyType = 'buy' | 'rent';

export default function PropertyScreen() {
  const [activePropertyType, setActivePropertyType] = useState<PropertyType>('buy');
  const [searchText, setSearchText] = useState('');

  const getPlaceholderText = () => {
    return activePropertyType === 'buy' ? 'Find your dream home' : 'Find your perfect rental';
  };

  const renderPropertyToggle = () => (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, activePropertyType === 'buy' && styles.activeToggleButton]}
        onPress={() => setActivePropertyType('buy')}
        activeOpacity={0.8}
      >
        <Text style={[styles.toggleButtonText, activePropertyType === 'buy' && styles.activeToggleButtonText]}>
          Buy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, activePropertyType === 'rent' && styles.activeToggleButton]}
        onPress={() => setActivePropertyType('rent')}
        activeOpacity={0.8}
      >
        <Text style={[styles.toggleButtonText, activePropertyType === 'rent' && styles.activeToggleButtonText]}>
          Rent
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Properties</Text>
          <Text style={styles.headerSubtitle}>Find your perfect space</Text>
        </View>

        {/* Tab Navigation - showing only Property as active */}
        <TabNavigation activeTab="property" onTabChange={() => {}} />

        {/* Buy/Rent Toggle */}
        {renderPropertyToggle()}

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            placeholder={getPlaceholderText()}
            value={searchText}
            onChangeText={setSearchText}
            showFilter={true}
            onFilterPress={() => {}}
          />
        </View>

        {/* Property Type Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search By Property Type</Text>
          <PropertyTypeGrid />
        </View>

        {/* Property Sections */}
        <PropertySection 
          title="Popular in Residential" 
          properties={RESIDENTIAL_PROPERTIES}
          onSeeAll={() => {}}
        />
        <PropertySection 
          title="Popular in Commercial" 
          properties={COMMERCIAL_PROPERTIES}
          onSeeAll={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.gray100,
    borderRadius: 16,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeToggleButton: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeToggleButtonText: {
    color: Colors.primary,
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});