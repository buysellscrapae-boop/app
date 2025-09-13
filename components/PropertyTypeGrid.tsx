import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { PROPERTY_TYPES } from '@/constants/dummyData';

export default function PropertyTypeGrid() {
  const renderPropertyType = ({ item }: { item: typeof PROPERTY_TYPES[0] }) => (
    <TouchableOpacity 
      style={styles.propertyTypeCard}
      activeOpacity={0.7}
    >
      <View style={[styles.propertyTypeIcon, { backgroundColor: item.color }]}>
        <Text style={styles.propertyTypeEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.propertyTypeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PROPERTY_TYPES}
        renderItem={renderPropertyType}
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  grid: {
    gap: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  propertyTypeCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    minHeight: 100,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  propertyTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyTypeEmoji: {
    fontSize: 20,
  },
  propertyTypeName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 14,
  },
});