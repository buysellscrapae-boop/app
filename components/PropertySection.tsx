import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ChevronRight } from 'lucide-react-native';

interface Property {
  id: string;
  price: string;
  title: string;
  location: string;
  image: string;
}

interface PropertySectionProps {
  title: string;
  properties: Property[];
}

export default function PropertySection({ title, properties }: PropertySectionProps) {
  const renderProperty = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyPrice}>{item.price}</Text>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <ChevronRight size={20} color={Colors.dark} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={properties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.propertiesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  propertiesList: {
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
});