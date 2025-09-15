import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

const MOTOR_TYPES = ['Car', 'Motorcycle', 'Auto Accessories & Parts', 'Heavy Vehicles', 'Boats', 'Number Plates'];
const EMIRATES = ['Dubai', 'Abu Dhabi', 'Ras Al Khaimah', 'Sharjah', 'Fujairah', 'Ajman', 'Umm Al Quwain', 'Al Ain'];
const REGIONAL_SPECS = ['GCC', 'American', 'Canadian', 'European', 'Japanese', 'Korean', 'Chinese', 'Other'];
const BODY_TYPES = ['SUV', 'Coupe', 'Sedan', 'Crossover', 'Convertible', 'Hard Top', 'Pickup Truck', 'Hatchback', 'Soft Top Convertible', 'Sports Car', 'Van', 'Wagon', 'Utility Truck', 'Others'];

// Generate years from 1921 to 2026
const YEARS = Array.from({ length: 2026 - 1921 + 1 }, (_, i) => (2026 - i).toString());

interface FormData {
  motorType: string;
  emirate: string;
  makeModel: string;
  trim: string;
  regionalSpecs: string;
  year: string;
  kilometres: string;
  bodyType: string;
  isInsured: boolean | null;
  price: string;
  phoneNumber: string;
}

export default function MotorsFormScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    motorType: '',
    emirate: '',
    makeModel: '',
    trim: '',
    regionalSpecs: '',
    year: '',
    kilometres: '',
    bodyType: '',
    isInsured: null,
    price: '',
    phoneNumber: '',
  });

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Validate required fields
    const requiredFields = ['motorType', 'emirate', 'makeModel', 'regionalSpecs', 'year', 'kilometres', 'bodyType', 'price', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0 || formData.isInsured === null) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // Navigate to summary with form data
    router.push({
      pathname: '/sell/motors/summary',
      params: formData
    });
  };

  const renderDropdown = (
    label: string,
    value: string,
    options: string[],
    onValueChange: (value: string) => void,
    placeholder: string = `Select ${label}`
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label} *</Text>
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
    keyboardType: 'default' | 'numeric' = 'default'
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label} *</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderInsuranceToggle = () => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>Is your car insured in UAE? *</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, formData.isInsured === true && styles.activeToggleButton]}
          onPress={() => setFormData({ ...formData, isInsured: true })}
        >
          <Text style={[styles.toggleButtonText, formData.isInsured === true && styles.activeToggleButtonText]}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, formData.isInsured === false && styles.activeToggleButton]}
          onPress={() => setFormData({ ...formData, isInsured: false })}
        >
          <Text style={[styles.toggleButtonText, formData.isInsured === false && styles.activeToggleButtonText]}>
            No
          </Text>
        </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Place an Ad - Motors</Text>
          <Text style={styles.headerSubtitle}>Fill in the details about your vehicle</Text>
        </View>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressStepCompleted]} />
          <View style={[styles.progressStep, styles.progressStepCompleted]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={styles.progressStep} />
        </View>
        <Text style={styles.progressText}>Step 3 of 4</Text>
      </View>

      {/* Form */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderDropdown(
          'Type of Motor',
          formData.motorType,
          MOTOR_TYPES,
          (value) => setFormData({ ...formData, motorType: value })
        )}

        {renderDropdown(
          'Emirates',
          formData.emirate,
          EMIRATES,
          (value) => setFormData({ ...formData, emirate: value })
        )}

        {renderTextInput(
          'Make & Model',
          formData.makeModel,
          (text) => setFormData({ ...formData, makeModel: text }),
          'e.g., Toyota Camry'
        )}

        {renderTextInput(
          'Trim',
          formData.trim,
          (text) => setFormData({ ...formData, trim: text }),
          'e.g., LE, SE, XLE'
        )}

        {renderDropdown(
          'Regional Specs',
          formData.regionalSpecs,
          REGIONAL_SPECS,
          (value) => setFormData({ ...formData, regionalSpecs: value })
        )}

        {renderDropdown(
          'Year',
          formData.year,
          YEARS,
          (value) => setFormData({ ...formData, year: value })
        )}

        {renderTextInput(
          'Kilometres',
          formData.kilometres,
          (text) => setFormData({ ...formData, kilometres: text }),
          'e.g., 50000',
          'numeric'
        )}

        {renderDropdown(
          'Body Type',
          formData.bodyType,
          BODY_TYPES,
          (value) => setFormData({ ...formData, bodyType: value })
        )}

        {renderInsuranceToggle()}

        {renderTextInput(
          'Price',
          formData.price,
          (text) => setFormData({ ...formData, price: text }),
          'e.g., 45000',
          'numeric'
        )}

        {renderTextInput(
          'Phone Number',
          formData.phoneNumber,
          (text) => setFormData({ ...formData, phoneNumber: text }),
          'e.g., +971501234567',
          'numeric'
        )}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.gray100,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggleButton: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeToggleButtonText: {
    color: Colors.primary,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});