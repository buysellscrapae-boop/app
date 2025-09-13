import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Search, CheckCheck, MessageSquarePlus } from 'lucide-react-native';

const DUMMY_CONVERSATIONS = [
  { 
    id: '1', 
    name: 'Ahmed Hassan', 
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    item: 'iPhone 14 Pro Max',
    itemImage: 'https://images.pexels.com/photos/14740599/pexels-photo-14740599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'Is the iPhone still available?', 
    time: '2 min ago', 
    unreadCount: 2,
    isRead: false,
    isOnline: true,
    type: 'buying',
    category: 'Electronics',
  },
  { 
    id: '2', 
    name: 'Sarah Al Zahra', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    item: 'Modern Sofa Set',
    itemImage: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'Can you deliver to Marina?', 
    time: '15 min ago', 
    unreadCount: 0,
    isRead: true,
    isOnline: false,
    type: 'selling',
    category: 'Furniture',
  },
  { 
    id: '3', 
    name: 'Mohammed Ali', 
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    item: 'MacBook Pro M2',
    itemImage: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'Thanks for the quick response!', 
    time: '1 hour ago', 
    unreadCount: 0,
    isRead: true,
    isOnline: true,
    type: 'buying',
    category: 'Electronics',
  },
  { 
    id: '4', 
    name: 'Fatima Al Rashid', 
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    item: 'BMW X5 2020',
    itemImage: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'Okay, see you then.', 
    time: '2 hours ago', 
    unreadCount: 0,
    isRead: true,
    isOnline: false,
    type: 'selling',
    category: 'Vehicles',
  },
  { 
    id: '5', 
    name: 'Abdullah Khan', 
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    item: '2BR Apt in Downtown',
    itemImage: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'When can I view it?', 
    time: '3 hours ago', 
    unreadCount: 1,
    isRead: false,
    isOnline: true,
    type: 'buying',
    category: 'Property',
  },
];

type FilterType = 'All' | 'Buying' | 'Selling';

export default function MessagesScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const renderItem = ({ item }: { item: typeof DUMMY_CONVERSATIONS[0] }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.itemImage }} style={styles.itemImage} />
          <Text style={styles.itemText}>{item.item}</Text>
        </View>
        <View style={styles.messageContainer}>
          {item.isOnline && <View style={styles.onlineDot} />}
          <Text style={styles.message} numberOfLines={1}>{item.lastMessage}</Text>
        </View>
      </View>
      <View style={styles.chatMeta}>
        <View style={styles.timeContainer}>
          <CheckCheck size={16} color={item.isRead ? Colors.primary : Colors.gray} />
          <Text style={styles.time}>{item.time}</Text>
        </View>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const filteredData = DUMMY_CONVERSATIONS.filter(item => {
    if (activeFilter === 'All') return true;
    return item.type === activeFilter.toLowerCase();
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Chat with buyers and sellers</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput
          placeholder="Search conversations..."
          style={styles.searchInput}
          placeholderTextColor={Colors.gray}
        />
      </View>

      <View style={styles.filterContainer}>
        {(['All', 'Buying', 'Selling'] as FilterType[]).map(filter => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity style={styles.fab}>
        <MessageSquarePlus size={24} color={Colors.white} />
        <Text style={styles.fabText}>Start New Chat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    marginHorizontal: 24,
    padding: 4,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
  },
  activeFilterText: {
    color: Colors.primary,
  },
  list: {
    paddingHorizontal: 24,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemImage: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 6,
  },
  itemText: {
    fontSize: 14,
    color: Colors.primary,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: 6,
  },
  message: {
    color: Colors.gray,
    fontSize: 14,
  },
  chatMeta: {
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: Colors.gray,
    fontSize: 12,
    marginLeft: 4,
  },
  unreadBadge: {
    backgroundColor: Colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 6,
  },
  unreadText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginLeft: 66, // avatar width + margin
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: Colors.success,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: Colors.white,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
