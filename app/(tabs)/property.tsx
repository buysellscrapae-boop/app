import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Search, Heart, Calendar } from 'lucide-react-native';

type PropertyType = 'buy' | 'rent';

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

const FEATURED_PROPERTIES = [
  {
    id: '1',
    price: 'Rs 70 Lacs',
    title: '8 Marla Residential Plot in...',
    subtitle: '8 marla',
    location: 'MPCHS - Block E, Islamabad',
    timeAgo: '15 hours ago',
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400',
    badges: ['Featured', 'For Sale']
  },
  {
    id: '2',
    price: 'Rs 3 Crore',
    title: '7 Marla Brand New Double...',
    subtitle: '4 beds • 6 baths • 7 m',
    location: 'MPCHS - Block E, Islamabad',
    timeAgo: '15 hours ago',
    image: 'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=400',
    badges: ['Featured', 'For Sale']
  }
];

const NEWS_ITEMS = [
  {
    id: '1',
    title: 'New Property Taxes Introduced in Punjab',
    description: 'Previously, the amendment in the Finance Bill 2025 to 2026 removed the tax on immovable property that has been in us...',
    date: 'Jul 2, 2025',
    image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Tax on Immovable Property Abolished...',
    description: 'In the recent budget of 2025 to 2026, the tax on the purchase of property was reduced. N...',
    date: 'Jun 24, 2025',
    image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Federal Excise Duty on Property Tran...',
    description: 'Great news for the real estate sector in Pakistan: the federal excise duty on property...',
    date: 'Apr 25, 2025',
    image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function PropertyScreen() {
  const [activePropertyType, setActivePropertyType] = useState<PropertyType>('buy');
  const [searchText, setSearchText] = useState('');

  const getPlaceholderText = () => {
    return activePropertyType === 'buy' ? 'Find your dream' : 'Find your dream flat';
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
      <View style={styles.propertyBadges}>
        {item.badges.map((badge, index) => (
          <View key={index} style={[styles.badge, badge === 'Featured' ? styles.featuredBadge : styles.forSaleBadge]}>
            <Text style={[styles.badgeText, badge === 'Featured' ? styles.featuredBadgeText : styles.forSaleBadgeText]}>
              {badge}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.heartIcon}>
        <Heart size={20} color={Colors.gray} />
      </TouchableOpacity>
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyPrice}>{item.price}</Text>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertySubtitle}>{item.subtitle}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyTime}>{item.timeAgo}</Text>
      </View>
    </View>
  );

  const renderBudgetOption = (option: string, index: number) => (
    <TouchableOpacity key={index} style={styles.budgetOption}>
      <Text style={styles.budgetOptionText}>{option}</Text>
    </TouchableOpacity>
  );

  const renderNewsItem = ({ item }: { item: typeof NEWS_ITEMS[0] }) => (
    <TouchableOpacity style={styles.newsItem}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.newsDate}>
          <Calendar size={14} color={Colors.gray} />
          <Text style={styles.newsDateText}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Navigation Tabs */}
        <View style={styles.topNavigation}>
          <TouchableOpacity style={styles.navTab}>
            <Text style={styles.navTabText}>OLX</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab}>
            <Text style={styles.navTabText}>Motors</Text>
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
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.gray} />
          <TextInput
            placeholder={getPlaceholderText()}
            style={styles.searchInput}
            placeholderTextColor={Colors.gray}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Search By Property Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search By Property Type</Text>
          <FlatList
            data={PROPERTY_TYPES}
            renderItem={renderPropertyType}
            keyExtractor={(item) => item.id}
            numColumns={5}
            scrollEnabled={false}
            contentContainerStyle={styles.propertyTypesGrid}
          />
        </View>

        {/* Featured Properties */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Properties For Sale</Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>View More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={FEATURED_PROPERTIES}
            renderItem={renderFeaturedProperty}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredPropertiesList}
          />
        </View>

        {/* Search By Budget */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithIcon}>
            <Text style={styles.budgetIcon}>🏠</Text>
            <Text style={styles.sectionTitle}>Search By Budget</Text>
          </View>
          <View style={styles.budgetGrid}>
            {BUDGET_OPTIONS.map((option, index) => renderBudgetOption(option, index))}
          </View>
        </View>

        {/* Latest News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest News</Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>View All News</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={NEWS_ITEMS}
            renderItem={renderNewsItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.dark,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 16,
  },
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
  },
  propertyBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredBadge: {
    backgroundColor: '#FFC107',
  },
  forSaleBadge: {
    backgroundColor: Colors.primary,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  featuredBadgeText: {
    color: Colors.dark,
  },
  forSaleBadgeText: {
    color: Colors.white,
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyInfo: {
    padding: 12,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 4,
  },
  propertyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 4,
  },
  propertySubtitle: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },
  propertyTime: {
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
  newsItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 16,
    marginBottom: 8,
  },
  newsDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsDateText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 4,
  },
});