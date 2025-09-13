import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: any;
}

export default function SearchBar({ placeholder, value, onChangeText, style }: SearchBarProps) {
  return (
    <View style={[styles.container, style]}>
      <Search color={Colors.gray} size={20} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={Colors.gray}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.dark,
  },
});