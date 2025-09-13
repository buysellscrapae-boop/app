import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { CATEGORIES, LISTINGS, RESIDENTIAL_PROPERTIES, COMMERCIAL_PROPERTIES } from '@/constants/dummyData';
import CategoryCard from '@/components/CategoryCard';
import ListingCard from '@/components/ListingCard';
import PropertySection from '@/components/PropertySection';
import SearchBar from '@/components/SearchBar';
import TabNavigation from '@/components/TabNavigation';
import PropertyTypeGrid from '@/components/PropertyTypeGrid';
import { MapPin, ChevronDown } from 'lucide-react-native';
import { useLocation } from '@/contexts/LocationContext';
import { useRouter } from 'expo-router';

type ActiveTab = 'all' | 'furniture' | 'property';

export default function HomeScreen() {
  const { location } = useLocation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [searchText, setSearchText] = useState('');

  const getFilteredCategories = () => {
    if (activeTab === 'furniture') {
      return CATEGORIES.filter(category => category.category === 'furniture');
    }
    if (activeTab === 'property') {
      return CATEGORIES.filter(category => category.category === 'property');
    }
    return CATEGORIES.slice(0, 12); // Show top 12 categories for 'all'
  };

  const getFilteredListings = () => {
    if (activeTab === 'furniture') {
      return LISTINGS.filter(listing => 
        CATEGORIES.find(cat => cat.name === listing.category)?.category === 'furniture'
      );
    }
    return LISTINGS.filter(listing => listing.featured);
  };

  const getPlaceholderText = () => {
    switch (activeTab) {
      case 'furniture':
        return 'Search furniture & home items...';
      case 'property':
        return 'Find your dream property...';
      default:
        return 'Search for anything...';
    }
  };

  const renderLocationButton = () => {
    if (!location) return null;
    
    return (
      <TouchableOpacity 
        style={styles.locationButton} 
        onPress={() => router.push('/location')}
        activeOpacity={0.7}
      >
        <MapPin size={16} color={Colors.textSecondary} strokeWidth={2} />
        <Text style={styles.locationText}>{location}</Text>
        <ChevronDown size={16} color={Colors.textSecondary} strokeWidth={2} />
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (activeTab === 'property') {
      return (
        <View style={styles.propertyContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search By Property Type</Text>
            <PropertyTypeGrid />
          </View>
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
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'furniture' ? 'Furniture Categories' : 'Popular Categories'}
          </Text>
          <FlatList
            data={getFilteredCategories()}
            renderItem={({ item }) => (
              <CategoryCard 
                item={item} 
                onPress={() => {}} 
                size={activeTab === 'all' ? 'small' : 'medium'}
              />
            )}
            keyExtractor={(item) => item.name}
            numColumns={activeTab === 'all' ? 4 : 3}
            scrollEnabled={false}
            columnWrapperStyle={styles.categoryRow}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Listings</Text>
          {getFilteredListings().map((item) => (
            <ListingCard key={item.id} item={item} onPress={() => {}} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>BuySellScrap.ae</Text>
          <Text style={styles.headerSubtitle}>Find everything you need</Text>
        </View>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Search and Location */}
        <View style={styles.searchSection}>
          <SearchBar
            placeholder={getPlaceholderText()}
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchBar}
            showFilter={true}
            onFilterPress={() => {}}
          />
          {renderLocationButton()}
        </View>

        {/* Content */}
        {renderContent()}
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
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchBar: {
    marginBottom: 12,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: 'flex-start',
  },
  locationText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  content: {
    paddingBottom: 32,
  },
  propertyContent: {
    paddingBottom: 32,
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
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});