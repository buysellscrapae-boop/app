import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { MapPin, Heart } from 'lucide-react-native';

interface ListingCardProps {
  item: {
    id: string;
    title: string;
    price: string;
    image: string;
    location: string;
    featured?: boolean;
  };
  onPress: () => void;
  showFavorite?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ item, onPress, showFavorite = true }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, item.featured && styles.featuredContainer]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        {showFavorite && (
          <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
            <Heart size={18} color={Colors.white} strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.textSecondary} strokeWidth={2} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  featuredContainer: {
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.gray100,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: '400',
  },
});

export default ListingCard;