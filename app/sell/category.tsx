import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ArrowLeft, Car, Briefcase, Chrome as Home, Key, Grid3x3 as Grid3X3, ChevronRight } from 'lucide-react-native';

const CATEGORIES = [
  {
    id: 'motors',
    title: 'Motors',
    subtitle: 'Cars, motorcycles & more',
    icon: Car,
    color: '#DC2626',
    gradient: ['#FEE2E2', '#FECACA'],
  },
  {
    id: 'property-sale',
    title: 'Property for Sale',
    subtitle: 'Houses, apartments & land',
    icon: Home,
    color: '#059669',
    gradient: ['#D1FAE5', '#A7F3D0'],
  },
  {
    id: 'property-rent',
    title: 'Property for Rent',
    subtitle: 'Rental properties & rooms',
    icon: Key,
    color: '#7C3AED',
    gradient: ['#EDE9FE', '#DDD6FE'],
  },
  {
    id: 'all-classifieds',
    title: 'All Classifieds',
    subtitle: 'Everything else you want to sell',
    icon: Grid3X3,
    color: '#F59E0B',
    gradient: ['#FEF3C7', '#FDE68A'],
  },
  {
    id: 'jobs',
    title: 'Jobs',
    subtitle: 'Find your next opportunity',
    icon: Briefcase,
    color: '#2563EB',
    gradient: ['#DBEAFE', '#BFDBFE'],
  },
];

export default function CategorySelectionScreen() {
  const router = useRouter();

  const handleCategorySelect = (categoryId: string) => {
    // Navigate to next step with selected category
    router.push(`/sell/details?category=${categoryId}`);
  };

  const handleBack = () => {
    router.back();
  };

  const renderCategoryCard = (category: typeof CATEGORIES[0], index: number) => {
    const Icon = category.icon;
    
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryCard,
          { 
            backgroundColor: category.gradient[0],
            borderColor: category.gradient[1],
          }
        ]}
        onPress={() => handleCategorySelect(category.id)}
        activeOpacity={0.7}
      >
        <View style={styles.categoryContent}>
          <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
            <Icon size={28} color={Colors.white} strokeWidth={2} />
          </View>
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
          </View>
        </View>
        <ChevronRight size={20} color={Colors.textSecondary} strokeWidth={2} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Hello, what are you{'\n'}listing today?</Text>
          <Text style={styles.headerSubtitle}>Choose the category that best fits your item</Text>
        </View>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressStepCompleted]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
        </View>
        <Text style={styles.progressText}>Step 2 of 4</Text>
      </View>

      {/* Categories */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((category, index) => renderCategoryCard(category, index))}
      </ScrollView>

      {/* Footer Hint */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't worry, you can change this later if needed
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    marginTop: 4,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 34,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '400',
    lineHeight: 22,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressBar: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
  },
  progressStepCompleted: {
    backgroundColor: Colors.success,
  },
  progressStepActive: {
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 20,
    gap: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '400',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textTertiary,
    textAlign: 'center',
    fontWeight: '400',
  },
});