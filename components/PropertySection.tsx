import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ChevronRight, MapPin } from 'lucide-react-native';

interface Property {
  id: string;
  price: string;
  title: string;
  location: string;
  image: string;
  type?: string;
  area?: string;
}

interface PropertySectionProps {
  title: string;
  properties: Property[];
  onSeeAll?: () => void;
}

export default function PropertySection({ title, properties, onSeeAll }: PropertySectionProps) {
  const renderProperty = ({ item, index }: { item: Property; index: number }) => (
    <TouchableOpacity 
      style={[
        styles.propertyCard,
        index === 0 && styles.firstCard,
        index === properties.length - 1 && styles.lastCard
      ]}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyPrice}>{item.price}</Text>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={12} color={Colors.textSecondary} strokeWidth={2} />
          <Text style={styles.propertyLocation}>{item.location}</Text>
        </View>
        {item.area && (
          <Text style={styles.propertyArea}>{item.area}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onSeeAll && (
          <TouchableOpacity 
            style={styles.seeAllButton} 
            onPress={onSeeAll}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={Colors.primary} strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={properties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.propertiesList}
        snapToInterval={280}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  propertiesList: {
    paddingLeft: 16,
  },
  propertyCard: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  firstCard: {
    marginLeft: 0,
  },
  lastCard: {
    marginRight: 16,
  },
  propertyImage: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.gray100,
  },
  propertyInfo: {
    padding: 16,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.danger,
    marginBottom: 4,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: '400',
  },
  propertyArea: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
});