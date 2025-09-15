import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { EMIRATES } from '@/constants/dummyData';
import { Colors } from '@/constants/Colors';
import { ChevronRight } from 'lucide-react-native';
import { useLocation } from '@/contexts/LocationContext';

export default function LocationModal() {
  const router = useRouter();
  const { setLocation } = useLocation();
  const params = useLocalSearchParams();
  const isSellFlow = params.from === 'sell';

  const handleSelectLocation = (selectedLocation: string) => {
    setLocation(selectedLocation);
    
    if (isSellFlow) {
      // Navigate directly to category selection for sell flow
      router.replace('/sell/category');
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={EMIRATES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectLocation(item)}>
            <Text style={styles.itemText}>{item}</Text>
            <ChevronRight color={Colors.gray} size={20} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },
  itemText: {
    fontSize: 18,
    color: Colors.dark,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 24,
  },
});
