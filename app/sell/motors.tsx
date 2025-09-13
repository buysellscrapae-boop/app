import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ChevronDown } from 'lucide-react-native';

interface MotorFormData {
  motorType: string;
  emirates: string;
  makeModel: string;
  trim: string;
  regionalSpecs: string;
  year: string;
  kilometres: string;
  bodyType: string;
  isInsured: string;
  price: string;
  phoneNumber: string;
}

const MOTOR_TYPES = ['Car', 'Motorcycle', 'Auto Accessories & Parts', 'Heavy Vehicles', 'Boats', 'Number Plates'];
const EMIRATES = ['Dubai', 'Abu Dhabi', 'Ras Al Khaimah', 'Sharjah', 'Fujairah', 'Ajman', 'Umm Al Quwain', 'Al Ain'];
const REGIONAL_SPECS = ['GCC', 'American', 'Canadian', 'European', 'Japanese', 'Korean', 'Chinese', 'Other'];
const BODY_TYPES = ['SUV', 'Coupe', 'Sedan', 'Crossover', 'Convertible', 'Hard Top', 'Pickup Truck', 'Hatchback', 'Soft Top Convertible', 'Sports Car', 'Van', 'Wagon', 'Utility Truck', 'Others'];
const YEARS = Array.from({ length: 106 }, (_, i) => (2026 - i).toString());

export default function MotorsFormScreen() {
  const router = useRouter();
  const { location } = useLocalSearchParams();
  
  const [formData, setFormData] = useState<MotorFormData>({
    motorType: '',
    emirates: location as string || '',
    makeModel: '',
    trim: '',
    regionalSpecs: '',
    year: '',
    kilometres: '',
    bodyType: '',
    isInsured: '',
    price: '',
    phoneNumber: '',
  });

  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const handleInputChange = (field: keyof MotorFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDropdownSelect = (field: keyof MotorFormData, value: string) => {
    handleInputChange(field, value);
    setShowDropdown(null);
  };

  const validateForm = () => {
    const required = ['motorType', 'emirates', 'makeModel', 'price', 'phoneNumber'];
    const missing = required.filter(field => !formData[field as keyof MotorFormData]);
    
    if (missing.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return false;
    }

    if (!formData.phoneNumber.startsWith('+971')) {
      Alert.alert('Invalid Phone Number', 'Phone number must start with +971');
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push({
        pathname: '/sell/motors-summary',
        params: { ...formData, location }
      });
    }
  };

  const renderDropdown = (
    field: keyof MotorFormData,
    options: string[],
    placeholder: string
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{placeholder} *</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(showDropdown === field ? null : field)}
      >
        <Text style={[styles.dropdownText, !formData[field] && styles.placeholderText]}>
          {formData[field] || `Select ${placeholder}`}
        </Text>
        <ChevronDown size={20} color={Colors.textSecondary} />
      </TouchableOpacity>
      
      {showDropdown === field && (
        <View style={styles.dropdownOptions}>
          <ScrollView style={styles.optionsScroll} nestedScrollEnabled>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleDropdownSelect(field, option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

  const renderTextInput = (
    field: keyof MotorFormData,
    placeholder: string,
    required = false,
    keyboardType: 'default' | 'numeric' = 'default'
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{placeholder} {required && '*'}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={`Enter ${placeholder.toLowerCase()}`}
        placeholderTextColor={Colors.textTertiary}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Motors Listing</Text>
        <Text style={styles.headerSubtitle}>Fill in the details about your vehicle</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {renderDropdown('motorType', MOTOR_TYPES, 'Type of Motor')}
          {renderDropdown('emirates', EMIRATES, 'Emirates')}
          {renderTextInput('makeModel', 'Make & Model', true)}
          {renderTextInput('trim', 'Trim')}
          {renderDropdown('regionalSpecs', REGIONAL_SPECS, 'Regional Specs')}
          {renderDropdown('year', YEARS, 'Year')}
          {renderTextInput('kilometres', 'Kilometres', false, 'numeric')}
          {renderDropdown('bodyType', BODY_TYPES, 'Body Type')}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Is your car insured in UAE?</Text>
            <View style={styles.radioContainer}>
              {['Yes', 'No'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.radioOption,
                    formData.isInsured === option && styles.radioOptionSelected
                  ]}
                  onPress={() => handleInputChange('isInsured', option)}
                >
                  <Text style={[
                    styles.radioText,
                    formData.isInsured === option && styles.radioTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {renderTextInput('price', 'Price (AED)', true, 'numeric')}
          {renderTextInput('phoneNumber', 'Phone Number', true, 'numeric')}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  placeholderText: {
    color: Colors.textTertiary,
  },
  dropdownOptions: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  optionsScroll: {
    maxHeight: 200,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  radioOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  radioOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  radioText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  radioTextSelected: {
    color: Colors.white,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
});