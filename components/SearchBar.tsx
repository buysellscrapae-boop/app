import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Search, SlidersHorizontal } from 'lucide-react-native';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: any;
  showFilter?: boolean;
  onFilterPress?: () => void;
}

export default function SearchBar({ 
  placeholder, 
  value, 
  onChangeText, 
  style, 
  showFilter = false,
  onFilterPress 
}: SearchBarProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <Search color={Colors.textSecondary} size={20} strokeWidth={2} />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor={Colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {showFilter && (
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <SlidersHorizontal color={Colors.primary} size={20} strokeWidth={2} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  filterButton: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
});