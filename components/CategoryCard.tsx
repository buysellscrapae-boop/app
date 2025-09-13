import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideProps } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface CategoryCardProps {
  item: {
    name: string;
    icon: React.FC<LucideProps>;
    color: string;
  };
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => {
  const Icon = item.icon;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Icon color={Colors.white} size={32} />
      </View>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
    textAlign: 'center',
  },
});

export default CategoryCard;
