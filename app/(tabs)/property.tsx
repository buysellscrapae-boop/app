import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import PropertyTypeGrid from '@/components/PropertyTypeGrid';
import PropertySection from '@/components/PropertySection';
import SearchBar from '@/components/SearchBar';

type PropertyType = 'buy' | 'rent';

const POPULAR_RENT_PROPERTIES = [
  {
    id: '1',
    price: 'AED 36,999',
    title: '2 Beds • 2 Baths',
    location: 'Bu Daniq',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    price: 'AED 39,999',
    title: '1 Bed • 2 Baths',
    location: 'Al Majaz 1, Al Majaz',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    price: 'AED 18,999',
    title: 'Studio • 1 Bath',
    location: 'Muwaileh',
    image: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=400',
  }
];

const POPULAR_SALE_PROPERTIES = [
  {
    id: '1',
    price: 'AED 3,500,000',
    title: '4 Beds • 5 Baths',
    location: 'Shoumous Residence...',
    image: 'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    price: 'AED 9,501,000',
    title: '2 Beds • 3 Baths',
    location: 'DAMAC Bay Tower...',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    price: 'AED 4,800,000',
    title: '5 Beds • 6 Baths',
    location: 'Shoumous...',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
  }
];

export default function PropertyScreen() {
  const [activePropertyType, setActivePropertyType] = useState<PropertyType>('buy');
  const [searchText, setSearchText] = useState('');

  const getPlaceholderText = () => {
    return activePropertyType === 'buy' ? 'Find your dream home' : 'Find your dream flat';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Navigation Tabs */}
        <View style={styles.topNavigation}>
          <TouchableOpacity style={styles.navTab}>
            <Text style={styles.navTabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab}>
            <Text style={styles.navTabText}>Furniture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navTab, styles.activeNavTab]}>
            <Text style={[styles.navTabText, styles.activeNavTabText]}>Property</Text>
          </TouchableOpacity>
        </View>

        {/* Buy/Rent Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, activePropertyType === 'buy' && styles.activeToggleButton]}
            onPress={() => setActivePropertyType('buy')}
          >
            <Text style={[styles.toggleButtonText, activePropertyType === 'buy' && styles.activeToggleButtonText]}>
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activePropertyType === 'rent' && styles.activeToggleButton]}
            onPress={() => setActivePropertyType('rent')}
          >
            <Text style={[styles.toggleButtonText, activePropertyType === 'rent' && styles.activeToggleButtonText]}>
              Rent
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          placeholder={getPlaceholderText()}
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchContainer}
        />

        {/* Search By Property Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search By Property Type</Text>
          <PropertyTypeGrid />
        </View>

        {/* Property Sections */}
        <PropertySection title="Popular in Residential" properties={POPULAR_RENT_PROPERTIES} />
        <PropertySection title="Popular in Commercial" properties={POPULAR_SALE_PROPERTIES} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  topNavigation: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 8,
  },
  navTab: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeNavTab: {
    backgroundColor: '#1B4D3E',
  },
  navTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
  },
  activeNavTabText: {
    color: Colors.white,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#E8F0FE',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggleButton: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray,
  },
  activeToggleButtonText: {
    color: Colors.primary,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 16,
  },
});