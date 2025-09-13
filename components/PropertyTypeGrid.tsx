import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';

const PROPERTY_TYPES = [
  { id: 'houses', name: 'Villa', icon: '🏠' },
  { id: 'apartments', name: 'Apartments\n& Flats', icon: '🏢' },
  { id: 'residential', name: 'Off\nPlan', icon: '🏞️' },
  { id: 'portions', name: 'Secondary', icon: '🏘️' },
  { id: 'shops', name: 'Shops', icon: '🏪' },
  { id: 'warehouse', name: 'Warehouse', icon: '🏭' },
  { id: 'offices', name: 'Offices', icon: '🏢' },
  { id: 'agricultural', name: 'Land', icon: '🌾' },
];

export default function PropertyTypeGrid() {
  const renderPropertyType = ({ item }: { item: typeof PROPERTY_TYPES[0] }) => (
    <TouchableOpacity style={styles.propertyTypeCard}>
      <View style={styles.propertyTypeIcon}>
        <Text style={styles.propertyTypeEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.propertyTypeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      key="property-types-grid"
      data={PROPERTY_TYPES}
      renderItem={renderPropertyType}
      keyExtractor={(item) => item.id}
      numColumns={5}
      scrollEnabled={false}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
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
});