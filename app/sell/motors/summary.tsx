import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ArrowLeft, Camera, MapPin, ChevronDown, Check } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const WARRANTY_OPTIONS = ['Yes', 'No', 'Does Not Apply'];
const TRANSMISSION_TYPES = ['Manual', 'Automatic'];
const SEATING_CAPACITY = ['2', '4', '5', '6', '7', '8', '8+'];
const STEERING_HAND = ['Left', 'Right'];

const TECHNICAL_FEATURES = [
  'Cruise Control', 'Front Airbags', 'Dual Exhaust', 'ABS', 'All-Wheel Drive',
  'Side Airbags', 'Power Steering', 'Entourage System', 'All-Wheel Steering',
  '4-Wheel Drive', 'Rear-Wheel Drive', 'Tiptronic Gears', 'Front-Wheel Drive'
];

interface SummaryData {
  postTitle: string;
  description: string;
  fuelType: string;
  exteriorColour: string;
  interiorColour: string;
  warranty: string;
  transmissionType: string;
  seatingCapacity: string;
  horsePower: string;
  steeringHand: string;
  technicalFeatures: string[];
  location: string;
}

export default function MotorsSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [summaryData, setSummaryData] = useState<SummaryData>({
    postTitle: '',
    description: '',
    fuelType: '',
    exteriorColour: '',
    interiorColour: '',
    warranty: '',
    transmissionType: '',
    seatingCapacity: '',
    horsePower: '',
    steeringHand: '',
    technicalFeatures: [],
    location: '',
  });

  const handleBack = () => {
    router.back();
  };

  const handlePostAd = () => {
    if (!summaryData.postTitle.trim()) {
      Alert.alert('Missing Information', 'Please add a post title.');
      return;
    }
    
    publishListing();
  };

  const publishListing = async () => {
    setLoading(true);
    
    try {
      if (!supabase) {
        throw new Error('Supabase not configured. Please set up your environment variables.');
      }

      if (!user) {
        throw new Error('User not authenticated');
      }

      const listingId = params.listingId as string;
      if (!listingId) {
        throw new Error('Listing ID not found');
      }

      // Update the listing with summary data and publish it
      const { error } = await supabase
        .from('motors_listings')
        .update({
          post_title: summaryData.postTitle,
          description: summaryData.description,
          fuel_type: summaryData.fuelType,
          exterior_colour: summaryData.exteriorColour,
          interior_colour: summaryData.interiorColour,
          warranty: summaryData.warranty,
          transmission_type: summaryData.transmissionType,
          seating_capacity: summaryData.seatingCapacity,
          horse_power: summaryData.horsePower,
          steering_hand: summaryData.steeringHand,
          technical_features: summaryData.technicalFeatures,
          location: summaryData.location,
          status: 'published'
        })
        .eq('id', listingId)
        .eq('user_id', user.id);

      if (error) throw error;

      Alert.alert(
        'Success!',
        'Your ad has been posted successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)')
          }
        ]
      );
    } catch (error) {
      console.error('Error publishing listing:', error);
      Alert.alert('Error', 'Failed to publish your listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTechnicalFeature = (feature: string) => {
    setSummaryData(prev => ({
      ...prev,
      technicalFeatures: prev.technicalFeatures.includes(feature)
        ? prev.technicalFeatures.filter(f => f !== feature)
        : [...prev.technicalFeatures, feature]
    }));
  };

  const renderBasicInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Basic Information</Text>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Make & Model:</Text>
          <Text style={styles.infoValue}>{params.makeModel}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Trim:</Text>
          <Text style={styles.infoValue}>{params.trim}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Regional Specs:</Text>
          <Text style={styles.infoValue}>{params.regionalSpecs}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Year:</Text>
          <Text style={styles.infoValue}>{params.year}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Kilometres:</Text>
          <Text style={styles.infoValue}>{params.kilometres}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Body Type:</Text>
          <Text style={styles.infoValue}>{params.bodyType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Price:</Text>
          <Text style={[styles.infoValue, styles.priceValue]}>{params.price} AED</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{params.phoneNumber}</Text>
        </View>
      </View>
    </View>
  );

  const renderPhotosSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Add Pictures</Text>
      <View style={styles.photosContainer}>
        <TouchableOpacity style={styles.photoButton} activeOpacity={0.7}>
          <Camera size={24} color={Colors.primary} strokeWidth={2} />
          <Text style={styles.photoButtonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton} activeOpacity={0.7}>
          <Camera size={24} color={Colors.primary} strokeWidth={2} />
          <Text style={styles.photoButtonText}>Choose from Files</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDropdown = (
    label: string,
    value: string,
    options: string[],
    onValueChange: (value: string) => void,
    placeholder: string = `Select ${label}`
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label={placeholder} value="" color={Colors.textSecondary} />
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
        <ChevronDown size={20} color={Colors.textSecondary} style={styles.dropdownIcon} />
      </View>
    </View>
  );

  const renderTextInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    multiline: boolean = false,
    maxLength?: number
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>
        {label}
        {maxLength && (
          <Text style={styles.characterCount}> ({value.length}/{maxLength})</Text>
        )}
      </Text>
      <TextInput
        style={[styles.textInput, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        multiline={multiline}
        maxLength={maxLength}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );

  const renderTechnicalFeatures = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Technical Features</Text>
      <View style={styles.featuresGrid}>
        {TECHNICAL_FEATURES.map((feature) => (
          <TouchableOpacity
            key={feature}
            style={[
              styles.featureChip,
              summaryData.technicalFeatures.includes(feature) && styles.selectedFeatureChip
            ]}
            onPress={() => toggleTechnicalFeature(feature)}
            activeOpacity={0.7}
          >
            {summaryData.technicalFeatures.includes(feature) && (
              <Check size={16} color={Colors.white} strokeWidth={2} />
            )}
            <Text style={[
              styles.featureText,
              summaryData.technicalFeatures.includes(feature) && styles.selectedFeatureText
            ]}>
              {feature}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>You are almost there!</Text>
          <Text style={styles.headerSubtitle}>Add final details to complete your listing</Text>
        </View>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressStepCompleted]} />
          <View style={[styles.progressStep, styles.progressStepCompleted]} />
          <View style={[styles.progressStep, styles.progressStepCompleted]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
        </View>
        <Text style={styles.progressText}>Step 4 of 4</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderBasicInfo()}
        {renderPhotosSection()}

        {renderTextInput(
          'Post Title *',
          summaryData.postTitle,
          (text) => setSummaryData({ ...summaryData, postTitle: text }),
          'e.g., 2020 Toyota Camry - Excellent Condition'
        )}

        {renderTextInput(
          'Description',
          summaryData.description,
          (text) => setSummaryData({ ...summaryData, description: text }),
          'Describe your vehicle in detail...',
          true,
          10000
        )}

        {renderDropdown(
          'Fuel Type',
          summaryData.fuelType,
          FUEL_TYPES,
          (value) => setSummaryData({ ...summaryData, fuelType: value })
        )}

        {renderTextInput(
          'Exterior Colour',
          summaryData.exteriorColour,
          (text) => setSummaryData({ ...summaryData, exteriorColour: text }),
          'e.g., White, Black, Silver'
        )}

        {renderTextInput(
          'Interior Colour',
          summaryData.interiorColour,
          (text) => setSummaryData({ ...summaryData, interiorColour: text }),
          'e.g., Black, Beige, Gray'
        )}

        {renderDropdown(
          'Warranty',
          summaryData.warranty,
          WARRANTY_OPTIONS,
          (value) => setSummaryData({ ...summaryData, warranty: value })
        )}

        {renderDropdown(
          'Transmission Type',
          summaryData.transmissionType,
          TRANSMISSION_TYPES,
          (value) => setSummaryData({ ...summaryData, transmissionType: value })
        )}

        {renderDropdown(
          'Seating Capacity',
          summaryData.seatingCapacity,
          SEATING_CAPACITY,
          (value) => setSummaryData({ ...summaryData, seatingCapacity: value })
        )}

        {renderTextInput(
          'Horse Power',
          summaryData.horsePower,
          (text) => setSummaryData({ ...summaryData, horsePower: text }),
          'e.g., 200 HP'
        )}

        {renderDropdown(
          'Steering Hand',
          summaryData.steeringHand,
          STEERING_HAND,
          (value) => setSummaryData({ ...summaryData, steeringHand: value })
        )}

        {renderTechnicalFeatures()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationButton} activeOpacity={0.7}>
            <MapPin size={20} color={Colors.primary} strokeWidth={2} />
            <Text style={styles.locationButtonText}>
              {summaryData.location || 'Select location via Google Maps'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Post Ad Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.postButton, loading && styles.disabledButton]} 
          onPress={handlePostAd}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.postButtonText}>
            {loading ? 'Publishing...' : 'Post Ad'}
          </Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: 4,
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
  formContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  priceValue: {
    color: Colors.primary,
    fontSize: 16,
  },
  photosContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  photoButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  photoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  dropdownContainer: {
    position: 'relative',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  picker: {
    height: 50,
    color: Colors.textPrimary,
  },
  pickerItem: {
    fontSize: 16,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 16,
    top: 15,
    pointerEvents: 'none',
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  selectedFeatureChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  selectedFeatureText: {
    color: Colors.white,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  locationButtonText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  postButton: {
    backgroundColor: Colors.success,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  postButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.6,
  },
});