import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { CATEGORIES, LISTINGS } from '@/constants/dummyData';
import CategoryCard from '@/components/CategoryCard';
import ListingCard from '@/components/ListingCard';
import PropertyTypeGrid from '@/components/PropertyTypeGrid';
import PropertySection from '@/components/PropertySection';
import SearchBar from '@/components/SearchBar';
import { MapPin, ChevronDown } from 'lucide-react-native';
import { useLocation } from '@/contexts/LocationContext';
import { useRouter } from 'expo-router';

type ActiveCategory = 'all' | 'furniture' | 'property';
type ActivePropertyType = 'buy' | 'rent';

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

export default function HomeScreen() {
  const { location } = useLocation();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const [activePropertyType, setActivePropertyType] = useState<ActivePropertyType>('buy');
  const [searchText, setSearchText] = useState('');

  const getFilteredCategories = () => {
    if (activeCategory === 'furniture') {
      return CATEGORIES.filter(category =>
        category.name.toLowerCase() === 'furniture' || category.name.toLowerCase() === 'home decor'
      );
    }
    return CATEGORIES;
  };

  const getFilteredListings = () => {
    if (activeCategory === 'furniture') {
      return LISTINGS.filter(listing =>
        listing.category.toLowerCase() === 'furniture' || listing.category.toLowerCase() === 'home decor'
      );
    }
    return LISTINGS;
  };

  const getPlaceholderText = () => {
    if (activeCategory === 'property') {
      return activePropertyType === 'buy' ? 'Find your dream home' : 'Find your dream flat';
    }
    return 'Search for anything...';
  };

  const renderNavButton = (category: ActiveCategory, title: string) => (
    <TouchableOpacity
      style={[styles.primaryNavButton, activeCategory === category && styles.activePrimaryNavButton]}
      onPress={() => setActiveCategory(category)}
    >
      <Text style={[styles.primaryNavButtonText, activeCategory === category && styles.activePrimaryNavButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderPropertySubNav = () => (
    <View style={styles.propertySubNavContainer}>
      {(['buy', 'rent'] as ActivePropertyType[]).map(type => (
        <TouchableOpacity
          key={type}
          style={[styles.propertySubNavButton, activePropertyType === type && styles.activePropertySubNavButton]}
          onPress={() => setActivePropertyType(type)}
        >
          <Text style={[styles.propertySubNavButtonText, activePropertyType === type && styles.activePropertySubNavButtonText]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Primary Navigation */}
        <View style={styles.primaryNavContainer}>
          {renderNavButton('all', 'All')}
          {renderNavButton('furniture', 'Furniture')}
          {renderNavButton('property', 'Property')}
        </View>

        {/* Property Sub-options */}
        {activeCategory === 'property' && renderPropertySubNav()}

        {/* Search and Location Row */}
        <View style={styles.searchAndLocationRow}>
          <SearchBar
            placeholder={getPlaceholderText()}
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchContainer}
          />
          {location && (
            <TouchableOpacity 
              style={styles.locationContainer} 
              onPress={() => router.push('/location')}
            >
              <MapPin size={16} color={Colors.gray} />
              <Text style={styles.locationText}>{location}</Text>
              <ChevronDown size={16} color={Colors.gray} />
            </TouchableOpacity>
          )}
        </View>

        {/* Content based on active category */}
        {activeCategory === 'property' ? (
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Search By Property Type</Text>
              <PropertyTypeGrid />
            </View>
            <PropertySection title="Popular in Residential" properties={POPULAR_RENT_PROPERTIES} />
            <PropertySection title="Popular in Commertial" properties={POPULAR_SALE_PROPERTIES} />
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <FlatList
                key="categories-list"
                data={getFilteredCategories()}
                renderItem={({ item }) => <CategoryCard item={item} onPress={() => {}} />}
                keyExtractor={(item) => item.name}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={styles.categoryRow}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Listings</Text>
              {getFilteredListings().slice(0, 3).map((item) => (
                <ListingCard key={item.id} item={item} onPress={() => {}} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  content: {
    paddingBottom: 20,
  },
  primaryNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 16,
    padding: 4,
  },
  primaryNavButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activePrimaryNavButton: {
    backgroundColor: Colors.primaryDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryNavButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray,
  },
  activePrimaryNavButtonText: {
    color: Colors.white,
  },
  propertySubNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    marginBottom: 16,
    padding: 3,
  },
  propertySubNavButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 7,
    alignItems: 'center',
  },
  activePropertySubNavButton: {
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  propertySubNavButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray,
  },
  activePropertySubNavButtonText: {
    color: Colors.white,
  },
  searchAndLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  locationText: {
    marginLeft: 4,
    marginRight: 4,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 16,
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
});