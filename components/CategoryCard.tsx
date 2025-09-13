import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TableProperties as LucideProps } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface CategoryCardProps {
  item: {
    name: string;
    icon: React.FC<LucideProps>;
    color: string;
  };
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress, size = 'medium' }) => {
  const Icon = item.icon;
  
  const getCardStyle = () => {
    switch (size) {
      case 'small':
        return styles.containerSmall;
      case 'large':
        return styles.containerLarge;
      default:
        return styles.container;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 40;
      default:
        return 28;
    }
  };

  const getIconContainerStyle = () => {
    switch (size) {
      case 'small':
        return [styles.iconContainer, styles.iconContainerSmall, { backgroundColor: item.color }];
      case 'large':
        return [styles.iconContainer, styles.iconContainerLarge, { backgroundColor: item.color }];
      default:
        return [styles.iconContainer, { backgroundColor: item.color }];
    }
  };

  return (
    <TouchableOpacity 
      style={getCardStyle()} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={getIconContainerStyle()}>
        <Icon color={Colors.white} size={getIconSize()} strokeWidth={2} />
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 6,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 120,
    maxWidth: 110,
  },
  containerSmall: {
    flex: 1,
    alignItems: 'center',
    margin: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 80,
    maxWidth: 90,
  },
  containerLarge: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    minHeight: 140,
    maxWidth: 130,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainerSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  iconContainerLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 16,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default CategoryCard;