import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { 
  ChevronRight, Heart, List, LogOut, Settings, Star, User, MapPin, Bell, HelpCircle, Shield, Box, PlusSquare, Edit3, ShieldCheck
} from 'lucide-react-native';

const StatCard = ({ icon: Icon, label, value }: any) => (
  <View style={styles.statCard}>
    <Icon color={Colors.primary} size={24} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ProfileRow = ({ icon: Icon, text, hasToggle, hasBadge, badgeCount, onPress }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <View style={styles.iconContainer}>
          <Icon color={Colors.dark} size={20} />
        </View>
        <Text style={styles.rowText}>{text}</Text>
      </View>
      <View style={styles.rowRight}>
        {hasToggle && <Switch trackColor={{ false: "#767577", true: Colors.primary }} thumbColor={isEnabled ? Colors.white : "#f4f3f4"} onValueChange={toggleSwitch} value={isEnabled} />}
        {hasBadge && <View style={styles.badge}><Text style={styles.badgeText}>{badgeCount}</Text></View>}
        {!hasToggle && <ChevronRight color={Colors.gray} size={20} />}
      </View>
    </TouchableOpacity>
  );
};

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionCard}>
      {children}
    </View>
  </View>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Edit3 size={14} color={Colors.dark} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Ahmed Hassan</Text>
          <Text style={styles.email}>ahmed.hassan@email.com</Text>
          <View style={styles.memberInfo}>
            <Text style={styles.memberSince}>Member since Jan 2023</Text>
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={14} color={Colors.success} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <StatCard icon={Box} value="23" label="Items Sold" />
          <StatCard icon={Star} value="4.8" label="Rating" />
          <StatCard icon={Heart} value="12" label="Favorites" />
        </View>

        <Section title="Account">
          <ProfileRow icon={User} text="Edit Profile" />
          <ProfileRow icon={MapPin} text="Manage Addresses" />
          <ProfileRow icon={Bell} text="Notifications" hasToggle />
        </Section>

        <Section title="My Items">
          <ProfileRow icon={List} text="My Listings" hasBadge badgeCount="5" />
          <ProfileRow icon={Heart} text="Saved Items" hasBadge badgeCount="12" />
          <ProfileRow icon={Star} text="Reviews & Ratings" />
        </Section>

        <Section title="Support">
          <ProfileRow icon={HelpCircle} text="Help Center" />
          <ProfileRow icon={Shield} text="Safety Tips" />
          <ProfileRow icon={Settings} text="Settings" />
        </Section>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <PlusSquare size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Post New Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Settings size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Account Settings</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <LogOut size={20} color={Colors.danger} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>BuySellScrap.ae v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ in UAE</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.white,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  editIcon: {
    position: 'absolute',
    bottom: 12,
    right: 0,
    backgroundColor: Colors.lightGray,
    padding: 6,
    borderRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  email: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  memberSince: {
    fontSize: 12,
    color: Colors.gray,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  verifiedText: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rowText: {
    fontSize: 16,
    color: Colors.dark,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.danger,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButtons: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F1',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  signOutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.danger,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: Colors.gray,
  },
});
