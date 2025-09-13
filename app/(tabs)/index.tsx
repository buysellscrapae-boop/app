import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { CATEGORIES, LISTINGS } from '@/constants/dummyData';
import CategoryCard from '@/components/CategoryCard';
import ListingCard from '@/components/ListingCard';
import { Search, MapPin, ChevronDown, Heart, Calendar, Image, ChevronRight } from 'lucide-react-native';
import { useLocation } from '@/contexts/LocationContext';
import { useRouter } from 'expo-router';

type ActiveCategory = 'all' | 'furniture' | 'property';
type ActivePropertyType = 'buy' | 'rent'; // New state for property sub-options

// Property types data
const PROPERTY_TYPES = [
  { id: 'houses', name: 'Houses', icon: '🏠' },
  { id: 'apartments', name: 'Apartments\n& Flats', icon: '🏢' },
  { id: 'residential', name: 'Residential\nPlots', icon: '🏞️' },
  { id: 'portions', name: 'Portions\n& Floors', icon: '🏘️' },
  { id: 'shops', name: 'Shops', icon: '🏪' },
  { id: 'warehouse', name: 'Warehouse', icon: '🏭' },
  { id: 'offices', name: 'Offices', icon: '🏢' },
  { id: 'agricultural', name: 'Agricultural\nLand', icon: '🌾' },
  { id: 'industrial', name: 'Industrial\nLand', icon: '🏭' },
  { id: 'commercial', name: 'Commercial\nPlots', icon: '🏬' },
];

const BUDGET_OPTIONS = [
  'Under 5 Lacs', '5 - 10 Lacs', '10 - 20 Lacs',
  '20 - 35 Lacs', '35 - 50 Lacs', '50 Lacs - 1 Crore',
  '1 - 1.5 Crore', '1.5 - 2.5 Crore', '3 - 5 Crore'
];

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
  const [activePropertyType, setActivePropertyType] = useState<ActivePropertyType>('buy'); // Default to 'buy'
  const [searchText, setSearchText] = useState('');

  const getFilteredCategories = () => {
    if (activeCategory === 'all') {
      return CATEGORIES;
    } else if (activeCategory === 'furniture') {
      return CATEGORIES.filter(category =>
        category.name.toLowerCase() === 'furniture' || category.name.toLowerCase() === 'home decor'
      );
    } else if (activeCategory === 'property') {
      if (activePropertyType === 'buy') {
        return CATEGORIES.filter(category =>
          category.name.toLowerCase().includes('for sale') || category.name.toLowerCase().includes('off-plan')
        );
      } else if (activePropertyType === 'rent') {
        return CATEGORIES.filter(category =>
          category.name.toLowerCase().includes('for rent')
        );
      }
    }
    return [];
  };

  const getFilteredListings = () => {
    if (activeCategory === 'all') {
      return LISTINGS;
    } else if (activeCategory === 'furniture') {
      return LISTINGS.filter(listing =>
        listing.category.toLowerCase() === 'furniture' || listing.category.toLowerCase() === 'home decor'
      );
    } else if (activeCategory === 'property') {
      if (activePropertyType === 'buy') {
        return LISTINGS.filter(listing =>
          listing.propertyType === 'for_sale'
        );
      } else if (activePropertyType === 'rent') {
        return LISTINGS.filter(listing =>
          listing.propertyType === 'for_rent'
        );
      }
    }
    return [];
  };

  const filteredCategories = getFilteredCategories();
  const filteredListings = getFilteredListings();

  const getPlaceholderText = () => {
    if (activeCategory === 'property') {
      return activePropertyType === 'buy' ? 'Find your dream' : 'Find your dream flat';
    }
    return 'Search for anything...';
  };

  const renderPropertyType = ({ item }: { item: typeof PROPERTY_TYPES[0] }) => (
    <TouchableOpacity style={styles.propertyTypeCard}>
      <View style={styles.propertyTypeIcon}>
        <Text style={styles.propertyTypeEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.propertyTypeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFeaturedProperty = ({ item }: { item: typeof FEATURED_PROPERTIES[0] }) => (
    <View style={styles.propertyCard}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyPrice}>{item.price}</Text>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
      </View>
    </View>
  );

  const renderBudgetOption = (option: string, index: number) => (
    <TouchableOpacity key={index} style={styles.budgetOption}>
      <Text style={styles.budgetOptionText}>{option}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Primary Navigation */}
        <View style={styles.primaryNavContainer}>
          <TouchableOpacity
            style={[styles.primaryNavButton, activeCategory === 'all' && styles.activePrimaryNavButton]}
            onPress={() => setActiveCategory('all')}
          >
            <Text style={[styles.primaryNavButtonText, activeCategory === 'all' && styles.activePrimaryNavButtonText]}>OLX</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.primaryNavButton, activeCategory === 'furniture' && styles.activePrimaryNavButton]}
            onPress={() => setActiveCategory('furniture')}
          >
            <Text style={[styles.primaryNavButtonText, activeCategory === 'furniture' && styles.activePrimaryNavButtonText]}>Furniture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.primaryNavButton, activeCategory === 'property' && styles.activePrimaryNavButton]}
            onPress={() => setActiveCategory('property')}
          >
            <Text style={[styles.primaryNavButtonText, activeCategory === 'property' && styles.activePrimaryNavButtonText]}>Property</Text>
          </TouchableOpacity>
        </View>

        {/* Property Sub-options */}
        {activeCategory === 'property' && (
          <View style={styles.propertySubNavContainer}>
            <TouchableOpacity
              style={[styles.propertySubNavButton, activePropertyType === 'buy' && styles.activePropertySubNavButton]}
              onPress={() => setActivePropertyType('buy')}
            >
              <Text style={[styles.propertySubNavButtonText, activePropertyType === 'buy' && styles.activePropertySubNavButtonText]}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.propertySubNavButton, activePropertyType === 'rent' && styles.activePropertySubNavButton]}
              onPress={() => setActivePropertyType('rent')}
            >
              <Text style={[styles.propertySubNavButtonText, activePropertyType === 'rent' && styles.activePropertySubNavButtonText]}>Rent</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search and Location Row */}
        <View style={styles.searchAndLocationRow}>
          <View style={styles.searchContainer}>
            <Search color={Colors.gray} size={20} />
            <TextInput
              placeholder={getPlaceholderText()}
              style={styles.searchInput}
              placeholderTextColor={Colors.gray}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
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

        {/* Conditional Content Based on Active Category */}
        {activeCategory === 'property' ? (
          <>
            {/* Search By Property Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Search By Property Type</Text>
              <FlatList
               key="property-types-list"
                data={PROPERTY_TYPES}
                renderItem={renderPropertyType}
                keyExtractor={(item) => item.id}
                numColumns={5}
                scrollEnabled={false}
                contentContainerStyle={styles.propertyTypesGrid}
              />
            </View>

            {/* Popular in Residential for Rent */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular for Rent</Text>
                <TouchableOpacity>
                  <ChevronRight size={20} color={Colors.dark} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={POPULAR_RENT_PROPERTIES}
                renderItem={renderFeaturedProperty}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredPropertiesList}
              />
            </View>

            {/* Popular in Residential for Sale */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular for Sale</Text>
                <TouchableOpacity>
                  <ChevronRight size={20} color={Colors.dark} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={POPULAR_SALE_PROPERTIES}
                renderItem={renderFeaturedProperty}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredPropertiesList}
              />
            </View>
          </>
        ) : (
          <>
            {/* Categories Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <FlatList
               key="categories-list"
                data={filteredCategories}
                renderItem={({ item }) => <CategoryCard item={item} onPress={() => {}} />}
                keyExtractor={(item) => item.name}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={styles.categoryRow}
              />
            </View>

            {/* Featured Listings Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Listings</Text>
              {filteredListings.slice(0, 3).map((item) => (
                <ListingCard key={item.id} item={item} onPress={() => {}} />
              ))}
            </View>
          </>
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

  // New style for the row containing search and location
  searchAndLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24, // Consistent with previous search margin
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 12, // Adjusted to match search input height
    borderRadius: 12, // Adjusted for consistency with search bar
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    // Removed marginBottom as it's now handled by searchAndLocationRow
  },
  locationText: {
    marginLeft: 4,
    marginRight: 4,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
  },
  searchContainer: {
    flex: 1, // Take up available space
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10, // Space between search and location
    // Removed marginBottom as it's now handled by searchAndLocationRow
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
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

  // Property-specific styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  viewMoreText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  propertyTypesGrid: {
    gap: 8,
  },
  propertyTypeCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    margin: 4,
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  propertyTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyTypeEmoji: {
    fontSize: 16,
  },
  propertyTypeName: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.dark,
    textAlign: 'center',
    lineHeight: 12,
  },
  featuredPropertiesList: {
    paddingRight: 16,
  },
  propertyCard: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  propertyInfo: {
    padding: 12,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4444',
    marginBottom: 4,
  },
  propertyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark,
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 12,
    color: Colors.gray,
  },
  budgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  budgetOption: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  budgetOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.dark,
    textAlign: 'center',
  },
});
