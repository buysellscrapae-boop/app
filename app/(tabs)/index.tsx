import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { CATEGORIES, LISTINGS } from '@/constants/dummyData';
import CategoryCard from '@/components/CategoryCard';
import ListingCard from '@/components/ListingCard';
import { Search, MapPin, ChevronDown } from 'lucide-react-native';
import { useLocation } from '@/contexts/LocationContext';
import { useRouter } from 'expo-router';

type ActiveCategory = 'all' | 'furniture' | 'property';
type ActivePropertyType = 'buy' | 'rent'; // New state for property sub-options

export default function HomeScreen() {
  const { location } = useLocation();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const [activePropertyType, setActivePropertyType] = useState<ActivePropertyType>('buy'); // Default to 'buy'

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Primary Navigation */}
        <View style={styles.primaryNavContainer}>
          <TouchableOpacity
            style={[styles.primaryNavButton, activeCategory === 'all' && styles.activePrimaryNavButton]}
            onPress={() => setActiveCategory('all')}
          >
            <Text style={[styles.primaryNavButtonText, activeCategory === 'all' && styles.activePrimaryNavButtonText]}>All</Text>
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
              placeholder="Search for anything..."
              style={styles.searchInput}
              placeholderTextColor={Colors.gray}
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

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
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
});
