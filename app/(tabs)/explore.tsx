import React from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { LISTINGS } from '@/constants/dummyData';
import ListingCard from '@/components/ListingCard';
import { Search } from 'lucide-react-native';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchContainer}>
        <Search color={Colors.gray} size={20} />
        <TextInput
          placeholder="Search all listings..."
          style={styles.searchInput}
          placeholderTextColor={Colors.gray}
        />
      </View>
      <FlatList
        data={LISTINGS}
        renderItem={({ item }) => <ListingCard item={item} onPress={() => {}} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.dark,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
